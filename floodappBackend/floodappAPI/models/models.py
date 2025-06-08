from mongoengine import Document, StringField, FloatField, DateTimeField, DictField,EmbeddedDocument, EmbeddedDocumentField
class Location(EmbeddedDocument):
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)

class FloodData(Document):
    FACILITY_TYPES = [
        ('hospital', 'Hospital'),
        ('evacuation_center', 'Evacuation Center'),
        ('other', 'Other')
    ]

    type = StringField(max_length=50, choices=FACILITY_TYPES, default='other')
    name = StringField(max_length=255, required=True)
    location = EmbeddedDocumentField(Location, required=True)
    timestamp = DateTimeField(auto_now_add=True)


    meta = {
        'collection': 'Locations',
        'indexes': ['timestamp']
    }

    def __str__(self):
        return f"{self.type} - {self.name} at {self.location} ({self.timestamp})"
    



class PublicAlert(Document):

    alertTitle = StringField(max_length=255, required=True)
    alertMessage = StringField(max_length=255,required= True)
    instructions = StringField(max_length=255,required= True)
    coordinates = DictField(required=True)
    timestamp = DateTimeField(auto_now_add=True)

    meta = {
        'collection': 'PublicAlert',
        'indexes': ['timestamp']
    }

    def __str__(self):
        return f"{self.type} - {self.name} at {self.location} ({self.timestamp})"
    



class Messages(Document):
    UserMessage = StringField(max_length=255,required = True)
    UserSend = StringField(max_length = 255,required = True)
    timestamp = DateTimeField(auto_now_add=True)


    meta = {
        'collection': 'Messages',
        'indexes': ['timestamp']
    }

    def __str__(self):
        return f"{self.type} - {self.name} at {self.location} ({self.timestamp})"