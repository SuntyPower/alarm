#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <Password.h>   //https://playground.arduino.cc/Code/Password
#include <Keypad.h>
#include <PubSubClient.h>

//<--- GLOBAL ALARM CONSTANTS -->

const String ver= "0.0.1";
const String uuid = "\"5b4433d290b4540de67991ef\"";

  // LED PINS

  // DOOR PINS
const byte door1 = 15;
volatile byte door1State = LOW;
  // WINDOW PINS

  // PIR PINS


  // BUZZER PINS
byte buzzer = D9;

//<--- GLOBAL ALARM VARIABLES -->
int alarmState = 0;
int alarmStatus = 0;

//<--- ALARM PASSWORD CONFIG -->
Password password = Password( "1234" );


//<--- KEYPAD CONFIG -->
const byte n_rows = 4;
const byte n_cols = 4;

char keys[n_rows][n_cols] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte colPins[n_rows] = {D3, D2, D1, D0};
byte rowPins[n_cols] = {D7, D6, D5, D4};

Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, n_rows, n_cols);



//<--- WIFI AND MQTT CONFIG -->
const char* ssid = "RioTel_ANSELMI";
const char* pass =  "rt522575";
const char* mqttServer = "192.168.1.107";
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);


void setup () {
  Serial.begin(115200);

  //<--- PINS SETUP -->

    // LED PINS

    // DOOR PINS
    pinMode(door1, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(door1), door1Interrupt, CHANGE);

    // WINDOW PINS

    // PIR PINS

    // BUZZER PINS
  //  pinMode(buzzer, OUTPUT);


  //<--- KEYPAD SETUP -->
  keypad.setHoldTime(1000);
  keypad.addEventListener(keypadEvent);


  //<--- WIFI SETUP -->
  WiFi.begin(ssid, pass);


  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");


  //<--- MQTT SETUP -->

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  while (!client.connected()) {
    delay(50);
      Serial.println("Connecting to MQTT...");

    if (client.connect("ESP8266Client")) {
        delay(50);
      Serial.println("connected");
    } else {

      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }


  Serial.println("finish setup");
}

void loop () {
  Serial.println(digitalRead(door1));
  client.loop();
  keypad.getKey();
}

void callback (char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
  Serial.println("-----------------------");

}

void mqttReport (bool triggered, int zone, String type) {

  String message ="{\"device\":{\"uuid\": "+uuid +",\"status\": "+alarmStatus+"},\"report\":{\"triggered\": "+triggered+", \"zone\": "+zone+",\"type\": \""+type+"\" }}";
  Serial.println("mqtt report: "+ message);
  char *mss = &message[0u];
  client.publish("sensor/motion",mss);
}

void keypadEvent (KeypadEvent eKey) {
  switch (keypad.getState()) {
    case PRESSED:
     switch (eKey) {

      case '#': //# is to validate password
        checkPassword();
        Serial.println("#");
        break;

      case '*': //* is to reset password attempt
        password.reset();
        break;

      default:
        password.append(eKey);
      }
    }
}


// check if PIN is corrected, if not, retry!
void checkPassword () {
  Serial.println("checkPassword");

  if (password.evaluate()) {
    if (alarmState == 0 && alarmStatus == 0) {
      activate();
    }
    else if ( alarmState == 1 || alarmStatus == 1) {
      desactivate();
    }
  }
  else {
    Serial.println("invalid Code");
    invalidCode();
  }
}
// display meaasge when a invalid is entered
void invalidCode () {
  password.reset();
}

// set alarm on active state
void activate () {
  alarmState = 1;
  // activate the sensors all interrupts
  password.reset();
  Serial.println("alarm activated");
}

void desactivate () {
  alarmState = 0;
  alarmStatus = 0;
  resetSensors();
  password.reset();
  Serial.println("alarm desactivated");
}

void resetSensors () {
  digitalWrite(buzzer,LOW);
}

void door1Interrupt () {
  door1State = !door1State;
  Serial.println("door interrupt ");
  Serial.println(door1State);

  if (alarmState == 1) {
    if (alarmStatus == 0) {
      digitalWrite(buzzer, HIGH);
    }
    mqttReport(door1State ? true: false, 1, "door");
  }
}
