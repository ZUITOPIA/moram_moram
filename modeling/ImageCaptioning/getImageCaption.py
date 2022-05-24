from withAttentionModel import EncoderDecoder
from withAttentionDataset import FlickrDataset
import torchvision
import torchvision.transforms as T
import torch
import torch.nn as nn
import torch.optim as optim
from PIL import Image
from pororo import Pororo
import requests
from io import BytesIO
from konlpy.tag import Komoran
import numpy as np

komoran = Komoran()
qg = Pororo(task="qg", lang="ko")
pg = Pororo(task="pg", lang="ko")
# caption = Pororo(task="caption", lang="ko")

device = "cuda"

transforms = T.Compose([
    T.Resize(226),
    T.RandomCrop(224),
    T.ToTensor(),
    T.Normalize((0.485, 0.456, 0.406),(0.229, 0.224, 0.225))
])

dataset = FlickrDataset(
    root_dir="../dataset/Images/",
    caption_file="../dataset/captions.txt",
    transform=transforms
)

embed_size=300
vocab_size = len(dataset.vocab)
attention_dim=256
encoder_dim=2048
decoder_dim=512
learning_rate = 3e-4


def get_caps_from(features_tensors):

    model = EncoderDecoder(
        embed_size=embed_size,
        vocab_size=vocab_size,
        attention_dim=attention_dim,
        encoder_dim=encoder_dim,
        decoder_dim=decoder_dim
    ).to(device)

    criterion = nn.CrossEntropyLoss(ignore_index=dataset.vocab.stoi["<PAD>"])
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    checkpoint = torch.load('../models/withAttentionModel.pth')
    model.load_state_dict(checkpoint['state_dict'], strict=False)

    model.eval()
    with torch.no_grad():
        features = model.encoder(features_tensors.to(device))
        caps, alphas = model.decoder.generate_caption(features, vocab=dataset.vocab)
        caption = ' '.join(caps)
        print(caption)

    return caption

def transToKor(enCaption):
    enCaption = enCaption.strip("<EOS>")
    client_id = ""  # 개발자센터에서 발급받은 Client ID 값
    client_secret = ""  # 개발자센터에서 발급받은 Client Secret 값
    url = "https://openapi.naver.com/v1/papago/n2mt"

    req_header = {"X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret}
    req_param = {"source": "en", "target": "ko", "text": enCaption}

    res = requests.post(url, headers=req_header, data=req_param)
    if res.ok:
        print(type(res.text), res.text)
        print(type(res.json()), res.json())
        trans_txt = res.json()['message']['result']['translatedText']
        print(trans_txt)
        return trans_txt
    else:
        print('error code', res.status_code)


def generateQuestion(koCaption):
    noun = komoran.nouns(koCaption)
    print(noun)
    randomOne = np.random.randint(len(noun), size=1)
    question = qg(
        noun[int(randomOne)],
        koCaption,
        n_wrong=3
    )
    print(question)



# img = Image.open('../sampleImages/sample2.jpg').convert('RGB')
imgResponse = requests.get("http://192.168.0.24:8080/sample.png")
img = Image.open(BytesIO(imgResponse.content)).convert('RGB')
img = transforms(img)

enCaption = get_caps_from(img.unsqueeze(0))
# koCaption = transToKor((enCaption))
# generateQuestion("한 무리의 사람들이 건물 앞의 벤치에 앉아 있다.")
