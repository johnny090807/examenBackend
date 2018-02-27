from bs4 import BeautifulSoup
from bson.objectid import ObjectId
from pymongo import MongoClient
import time
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.options import define, options

define("port", default=3002, help="run on the given port", type=int)

class MainHandler(tornado.web.RequestHandler):
    def post(self):
        r_list=[]
        saldo=[]
        nfc_id=[]
        price=[]
        data = self.request.body
        soup = BeautifulSoup(data, "xml")
        if soup.find('tokenId') != None:
            nfc_id.append(soup.find('tokenId').text.upper())
            price.append(soup.find('amountCents').text)
            #When posId is implemented in database:
            #posId = soup.find('posId').text
            if Checknup(price, nfc_id, saldo) == True:
                r_code = '7'
                r_mess = 'Betaald. Resterend saldo: €' + str(saldo[0]/100)
                r_create(r_code, r_mess, r_list)
                self.write(r_list[0])
            elif len(saldo)!=0:
                r_code = '8'
                r_mess = 'Betaling mislukt. Saldo: €' + str(saldo[0]/100)
                r_create(r_code, r_mess, r_list)
                self.write(r_list[0])
            else:
                r_code = '8'
                r_mess = 'Onbekende kaart'
                r_create(r_code, r_mess, r_list)
                self.write(r_list[0])
    
def Checknup(price, nfc_id, saldo):
    print('check')
    client = MongoClient("localhost", 27017)
    db = client.sportschooldb
    identifiers = db.identifiers
    users = db.users
    if identifiers.find_one({"nfcId":nfc_id[0]}) != None:
        id = identifiers.find_one({"nfcId": nfc_id[0]})['user']
        user = users.find_one({"_id":ObjectId(id)})
        if user['credit']>=int(price[0]):
            users.update_one({'_id':ObjectId(id)}, {"$inc": {'credit': -int(price[0])}}, upsert=False)
            saldo.append(user['credit']-int(price[0]))
            return(True)
        elif user['credit']<int(price[0]):
            saldo.append(user['credit'])
            return(False)
    else:
        return(False)

def r_create(r_code, r_mess, r_list):
    unix = str(int(time.time()))
    response="""<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-
      instance"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                  xmlns:txn="http://txnHost.payter.com">
         <soapenv:Header/>
         <soapenv:Body>
        <txn:paymentResponse
      soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
               <paymentReturn xsi:type="txn:PaymentTxnResponse">
                  <resultCode xsi:type="xsd:int">"""+r_code+"""</resultCode>
                  <resultMessage
      xsi:type="xsd:string">"""+r_mess+"""</resultMessage>
                  <serverTime xsi:type="xsd:long">"""+unix+"""</serverTime>
                  <transactionRef xsi:type="xsd:int">1</transactionRef>
               </paymentReturn>
            </txn:paymentResponse>
         </soapenv:Body>
      </soapenv:Envelope>"""
    r_list.append(response)
    
def main():
    tornado.options.parse_command_line()
    application = tornado.web.Application([
        (r"/", MainHandler),
    ])
########NO SSL Version:
#    http_server = tornado.httpserver.HTTPServer(application)
########SSL VERSION:
    http_server = tornado.httpserver.HTTPServer(application, ssl_options={
         "certfile": "./keys/fullchain.pem",
         "keyfile": "./keys/privkey.pem",
    })

    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()