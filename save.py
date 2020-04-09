#!/usr/bin/python

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sys

# Use the application default credentials
cred = credentials.Certificate("creds.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

key = sys.argv[1] + ',' + sys.argv[2]
filename = sys.argv[3]

f = open(filename, 'r')
value = "\n".join(f.readlines())
data = {
  unicode(key) : unicode(value)
}

db.collection(u'app').document(u'grid').update(data)

print 1
