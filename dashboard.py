import mysql.connector
import os
import dotenv 
import json
import pandas as pd

with open('./data.json', 'r') as file:
    data = json.load(file)
    data = data['products']

db = mysql.connector.connect(
    host='localhost',
    user='danieleghosa',
    passwd='mySQL2004@',
    database='pythondb',
)

# mycursor = db.cursor()


def queryStatement(brand, product, sales, price):
    mycursor = db.cursor()
    mycursor.execute('INSERT INTO NewDB(brand, product, price, sales) VALUES(%s, %s, %s, %s)', (brand, product,price, sales, ))
    db.commit()
    return    


def populateBrand():
    for item in data:
        brand = item['brand']
        product = item['name']
        price = item['price']
        sales = item['annualSales']
        queryStatement(brand, product, price, sales)
    return

# populateBrand()

query = """
    SELECT * FROM NewDB
"""

cursor = db.cursor()
cursor.execute(query)

results = []
for i, data in enumerate(cursor):
    results.append(data)

cursor.close()
db.close()

pulled_df = pd.DataFrame(results)
pulled_df.columns = ["sales_id", "brand", "product", "price", "annual_sales"]
# print(pulled_df)


options = ['See all data', 'All brands', 'Specific brands']


connector =  mysql.connector.connect(
    
    host='localhost',
    user='danieleghosa',
    passwd='mySQL2004@',
    database='pythondb',
)

## if query == 1, see al data
def queryDB(user_choice):
    user_query = """SELECT * FROM NewDB"""
    all_data = []
    
    if user_choice == 1:
        cursor = connector.cursor()
        cursor.execute(user_query)
        
        for i, data  in cursor:
            all_data.append(data)    
        cursor.close()
        connector.close()
        
        # pulled_data = pd.DataFrame(all_data)
        # pulled_data.columns = ["sales_id", "brand", "product", "price", "annual_sales"]
        
        # print(pulled_data)
        return
    else:
        print(user_choice)

    
## function that takes queries:
def takeQuery():
    print('Please enter queries')
    for i, option in enumerate(options, 1):
        print(f'{i}. {option}')
    
    # user_input = input('Please select from the options above')
        
    while True:
        user_input = input('Please select from the options above')
        
        try:
            user_input = int(user_input)
            
            if user_input < 1 or  user_input > len(options): 
                print(f'Invalid selection, entry must be between 1 and {len(options)}')
                True
            else:
                user_choice = user_input;
                print(f'{user_choice} selected')
                queryDB(user_choice)
                return user_choice
            
        
        except ValueError:
            print(f'Must be a digit between 1 and {len(options)}')
            True
        
        
takeQuery()
