import json
from random import randint, shuffle
genres = json.loads('{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}')['genres']

genre_ids = map(lambda x: x['id'], genres)
fav_genre=28
fav_genre2=12
fav_genre3=10752
EPOCH = 50
n_fav= randint(EPOCH*0.1, EPOCH*0.2);
data=[]

i=0
while i<n_fav:
    data.append(fav_genre)
    data.append(fav_genre2)
    data.append(fav_genre3)
    i+=1

i=0
while i<(EPOCH-(n_fav*3)):
    rand_index = randint(0, len(genre_ids)-1)
    data.append(genre_ids[rand_index])
    i+=1

shuffle(data)

movies = []
n_cats = 5
i=0
while i<EPOCH:
    j=0
    movie={
        'genres':[],
        'target':0
    }
    if data[i]==fav_genre or data[i]==fav_genre2 or data[i]==fav_genre3 : movie['target']=1
    movie['genres'].append(data[i])
    j+=1
    while j<n_cats:
        rand_index = randint(0, len(genre_ids)-1)
        while genre_ids[rand_index] in movie['genres']:
            rand_index = randint(0, len(genre_ids)-1)
        if genre_ids[rand_index]==fav_genre or genre_ids[rand_index]==fav_genre2 or genre_ids[rand_index]==fav_genre3 : movie['target']=1
        movie['genres'].append(genre_ids[rand_index])
        j+=1

    movies.append(movie)
    i+=1
print json.dumps(movies, sort_keys=True)
