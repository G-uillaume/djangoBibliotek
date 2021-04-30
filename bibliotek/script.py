# import csv
# from titles.models import TitleBasics
import sys
import csv
import random

fileIn = open('/Applications/MAMP/htdocs/BeCode/Laravel/bibliotek/database/seeds/csvs/books.csv')
fileout = open('/Users/guillaumevanleynseele/repos/Python/Envs/libraryDjango/bibliotek/books2.csv', 'w+')

tabin = csv.reader(fileIn, delimiter=',')
commaout = csv.writer(fileout, delimiter=',')

i = 1
for row in tabin:
    # row.insert(0, i)
    for i in range(len(row)):
        if type(row[i]) == str:
            row[i] = row[i].replace('_', ' ')
    row.append(random.randint(0, 20))
    row.append(random.randrange(10, 101, 10))
    commaout.writerow(row)
    i += 1

# path = '/Users/guillaumevanleynseele/Desktop/IMDBDatas/title.basics.tsv'
# print(path)
# with open(path) as f:
#     reader = csv.reader(f, delimiter='\t')
#     i = 0
#     for row in reader:
#         if i > 0:
#             TitleBasics.objects.create(
#                 tconst=row[0],
#                 titleType=row[1],
#                 primaryTitle=row[2],
#                 originalTitle=row[3],
#                 isAdult=row[4],
#                 startYear=row[5],
#                 endYear=row[6],
#                 runtimeMinutes=row[7],
#                 genres=row[8],
#             )
#         i+=1
#     print(reader)
