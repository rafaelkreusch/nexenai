import requests
base='https://nexenaioficial.uazapi.com'
token='nAUaQ02sO2JnesTg5HLEtXBgCJUiwmv8nKcqk7mk0J9TA0doXiN'
headers={'admintoken': token, 'token': token}
res=requests.delete(f'{base}/instance', headers=headers)
print(res.status_code, res.text)

