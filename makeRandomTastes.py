import json
from random import randint, shuffle
genres = json.loads('{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}')['genres']

genre_ids = map(lambda x: x['id'], genres)
fav_genre=28
EPOCH = 10000
n_fav= randint(EPOCH/3, EPOCH/2);
data=[]

i=0
while i<n_fav:
    data.append(fav_genre)
    i+=1

i=0
while i<(EPOCH-n_fav):
    rand_index = randint(0, len(genre_ids)-1)
    data.append(genre_ids[rand_index])
    i+=1

shuffle(data)
print json.dumps(data, sort_keys=True)
