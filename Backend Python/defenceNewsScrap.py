
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def remove(duplicate):
    final_list = []
    for num in duplicate:
        if num not in final_list:
            final_list.append(num)
    return final_list


def dateToTimestamp(dateString):
    dateArray = dateString.split(',')
    dateStingWithoutDay = ""
    if len(dateArray) == 3:
        dateStingWithoutDay = ((dateArray[1].strip()) + "," + (dateArray[2].strip()))
 #   date_string = "1 August,2019"
 #   print(dateStingWithoutDay)
    formattedDate = datetime.strptime(dateStingWithoutDay, "%B %d,%Y")
 #   print(datetime.timestamp(formattedDate))
    timestamp = datetime.timestamp(formattedDate)
    return timestamp


def sendAndInsertDataToMySql(data):
    #api-endpoint
    URL = "https://defence24x7.com/insertData.php"
    #define parameter dict
    finalDataJson = json.dumps(data)
    #send post request to api
    #print(finalDataJson)
    r = requests.post(url=URL, json=data)
    print(r.text)


page = requests.get('https://www.defencenews.in/')
soup = BeautifulSoup(page.content, 'html.parser')
arrayData = []
weblinks = soup.find_all('a')

for link in weblinks:
    linkDemo = "/article/"
    # print(link.get('href'))
    if linkDemo in str(link):
        arrayData.append(link.get('href'))

arrayData = remove(arrayData)
number = 0
finalDataDict = {}
for data in arrayData:
    # print(data)
    '''
        Data needs to be passed are follows
        articleDate : Date timestamp of article (Eg: 1574706600)
        articleSource : Source of article (eg: Times Now News)
        articleSourceLink : Source link of article (eg: https://economictimes.indiatimes.com/news/defence/chinese-spies-spook-democracies-from-u-s-to-europe-to-australia/articleshow/72239308.cms)
        articleHeader : header title of the article
        articleDescription : Full content of article 
    '''

    page = requests.get(data)
    soup = BeautifulSoup(page.text, 'html.parser')
    #print("Header : " + (soup.find('h2')).get_text())
    #print(((soup.find("div", {"class": "source_link"})).find('p')).get_text())
    articleDateAndSource = ((soup.find("div", {"class": "source_link"})).find('p')).get_text()
    articleDate = dateToTimestamp(articleDateAndSource.splitlines()[1])
    articleSource = ((articleDateAndSource.splitlines()[2]).split(':')[1])
   # print((articleDateAndSource.splitlines()[2]).split(':')[1])
    articleHeader = (soup.find('h2')).get_text()
    articleSourceLink = ""
    articleDescription = ""
    defenceNewsWord = "By: Defence News"
    articleImageLink = (((soup.find("ul", {"class": "bxslider1 Content-Image"})).find('img')).get('src'))
    if not defenceNewsWord in articleDateAndSource:
        link = (soup.find("span", {"id": "dtlstNews_SourceLink_0"}))
        if link is not None:
  #          print(((soup.find("span", {"id": "dtlstNews_SourceLink_0"})).find('a')).get('href'))
            articleSourceLink = (((soup.find("span", {"id": "dtlstNews_SourceLink_0"})).find('a')).get('href'))
     #   print(((soup.find("div", {"class": "art-discription"})).find('p')).get_text())
        articleDescription = str(((soup.find("div", {"class": "art-discription"})).find('p')))

        articleDescription = articleDescription.replace('(adsbygoogle = window.adsbygoogle | |[]).push({});', '')
        articleDescription = articleDescription.replace('"','\"')
        print(articleDescription)

    else:
       continue
    singleDataDictionary = {"articleHeader":articleHeader,
                            "articleDate":articleDate,
                            "articleSource":articleSource,
                            "articleSourceLink":articleSourceLink,
                            "articleDescription":articleDescription,
                            "articleImageLink":articleImageLink,
                            "articleScrapSource":"DefenceNews.in"
                            }
    finalDataDict[number] = singleDataDictionary
    '''    print("Title Header : " + articleHeader)
    print("Timestamp : " + str(articleDate))
    print("Source : " + articleSource)
    print("Source link : " + articleSourceLink)
    print("Content : " + articleDescription)
    print("-*--*--**-*-***-*-*-*-*-*-*-*-*-*-")
   '''

    '''if number == 0:
        sendAndInsertDataToMySql(finalDataDict)
        print("Print data done"+str(number))
        finalDataDict.clear()
        number = 0
    else:
        number += 1'''
    number += 1
print(number)
#for data in range(len(finalDataDict)):
    #print(finalDataDict[data])
print("Print data done")

sendAndInsertDataToMySql(finalDataDict)



