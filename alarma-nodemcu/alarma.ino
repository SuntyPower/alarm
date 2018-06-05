#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <Password.h>   //https://playground.arduino.cc/Code/Password
#include <Keypad.h>
#include <PubSubClient.h>

const String ver= "0.0.1";
const byte n_rows = 4;
const byte n_cols = 4;
const String uuid = "2";
char keys[n_rows][n_cols] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte colPins[n_rows] = {D3, D2, D1, D0};
byte rowPins[n_cols] = {D8, D7, D6, D5};

Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, n_rows, n_cols);

//bollean for check password
boolean PUERTA1=false;
boolean PIR1=false;
Password password = Password( "1234" );
int passwd_pos = 15;
boolean BUZZER = false; //activar -desactivar bocina
int alarmStatus = 0;
int alarmActive = 0;
//LED pines
byte redLed = D10;
byte greenLed = D9;
//PIR pines
byte pir1 = D4;
//puertas pines
//int puerta1 = D1;
//ventanas pines
// int ventana1 = 38;
// //buzzer pines
 //byte buzzer = D12;
 int counter=0;

 const char* ssid = "Elliot Anderson";
 const char* pass =  "mr. robot28";
 const char* mqttServer = "192.168.0.12";
 const int mqttPort = 1883;


 WiFiClient espClient;
 PubSubClient client(espClient);

void setup() {

  Serial.begin(115200);

WiFi.begin(ssid, pass);

while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.println("Connecting to WiFi..");
}

Serial.println("Connected to the WiFi network");

client.setServer(mqttServer, mqttPort);
client.setCallback(callback);

while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

  if (client.connect("ESP8266Client")) {
    Serial.println("se conecto");
    Serial.println("connected");
  } else {

    Serial.print("failed with state ");
    Serial.print(client.state());
    delay(2000);
  }
}

  pinMode(redLed, OUTPUT); //luz roja
  pinMode(greenLed, OUTPUT); //luz verda

  //pinMode(buzzer,OUTPUT);

  pinMode(pir1, INPUT); //Cocina

  //pinMode(ventana1, INPUT); //ventanas cocina

  //pinMode(puerta1, INPUT); //puerta frente

  digitalWrite(redLed, LOW); //alarma activada
  digitalWrite(greenLed, HIGH); //alarma desactivada

  //digitalWrite(buzzer, LOW); //sirena
  keypad.setHoldTime(1000);
  keypad.addEventListener(keypadEvent);
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
 mqttReport(PIR1,1,"pir");
 Serial.println("finish setup");

}
 void loop(){

   Serial.println("loop start");
   keypad.getKey();
   if (alarmActive == 1){
    Serial.println("alarm Active == 1");

     if(digitalRead(pir1)==HIGH && !PIR1){

       Serial.println("Sensor pir1 detected");
       alarmTriggered();
       PIR1=true;
       mqttReport(PIR1,1,"pir");
       motionDetected("Sensor pir1");
     }

     if(digitalRead(pir1)==LOW && PIR1){
      motionEnded("Sensor Cocina");
      PIR1=false;
     }
   }
}


void alarmTriggered(){
  digitalWrite(greenLed,LOW);
//  digitalWrite(buzzer, HIGH);
  digitalWrite(redLed, HIGH);
//
  password.reset();
  alarmStatus = 1;
}

void mqttReport(bool triggered, int zone, String type) {
  // String message= "'device': {'uuid': 'uuid','status': 'acive' },'report':{'triggered': 'true','zone': 'Cocina', 'type':'PIR'}"
  String message ="{\"device\":{\"uuid\": "+uuid +",\"status\": "+alarmStatus+"},\"report\":{\"triggered\": "+triggered+", \"zone\": "+zone+",\"type\": \""+type+"\" }}";
  char *mss = &message[0u];
  client.publish("sensor/motion",mss);
}

void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
  Serial.println("-----------------------");

}


void motionEnded(String s) {
  String place = s;
  Serial.print("NO MAS MOVIMIENTO");
  Serial.print("EN " + s);
  delay(2000);

  //aca iria Algun tipo de SMS o INTERNET AVISO algo a implementar.
  //
}

void motionDetected(String s) {
  String place = s;

  Serial.print("MOVIMIENTO DETECTADO");
  Serial.print("EN " + s);
  delay(2000);
  //aca iria Algun tipo de SMS o INTERNET AVISO algo a implementar.
  //

}

void doorClosed(String s) {
  String place = s;

  Serial.print("SE CERRO");

  Serial.print("LA " + s);
  delay(2000);

  //aca iria Algun tipo de SMS o INTERNET AVISO algo a implementar.
  //
}
void doorOpen(String s) {
  String place = s;

  Serial.print("SE ABRIO");

  Serial.print("LA " + s);
  delay(2000);

  //aca iria Algun tipo de SMS o INTERNET AVISO algo a implementar.
  //
}


void activatingAlarmScreen() {

  Serial.print("ACTIVANDO ALARMA");

  Serial.print("EN: ");


}



void welcomeScreen() {


  Serial.print("<<  BIENVENIDO A  >>");

  Serial.print("<< ANSELMI SYSTEM >>");
}


void manyFailsScreen() {

  Serial.print("Muchos intentos");

  Serial.print("Espere...   ");

}

void putPassScreen() {

  Serial.print("INGRESE PASSWORD");

  Serial.print("PASS>");
}

void validPassScreen() {

  Serial.print("Contrasena Correcta!!");

}

void wrongPassScreen() {

  Serial.print("Contrasena Invalida");
  Serial.print("Intente nuevamente");
  delay(900);
}


void alarmDetectScreen(String s) {

  Serial.print("Movimiento Detect");
  Serial.print("En " + s);
  delay(2000);
}


void enableSiren() {
//  digitalWrite(buzzer, HIGH);
  BUZZER = true;
}

void disableSiren() {
//  digitalWrite(buzzer, LOW);
  BUZZER = false;
}

void newPassScreen() {
  Serial.print("Nueva contra");

}


void keypadEvent(KeypadEvent eKey) {
   blink();

  switch (keypad.getState()) {

    case PRESSED:

       switch (eKey) {

        case '#': //# is to validate password
          passwd_pos = 15;
          checkPassword();
          Serial.println("#");
          break;

        case '*': //* is to reset password attempt

          password.reset();
          passwd_pos = 15;

          // TODO: clear the screen output

          break;

        default:
          counter++;
          Serial.print(counter);
          password.append(eKey);

         }
}
     }

void checkPassword() { // To check if PIN is corrected, if not, retry!
  Serial.println("checkPassword");
  if (password.evaluate())
  {
    if(alarmActive == 0 && alarmStatus == 0)
    {
      activate();
    }
    else if( alarmActive == 1 || alarmStatus == 1) {
      desactivate();
    }
  }
  else {
    Serial.println("invalid invalidCode");
    invalidCode();
  }
}


void invalidCode() // display meaasge when a invalid is entered
{
  wrongPassScreen();
  password.reset();
  delay(2000);
}

void activate(){
  alarmActive=1;
  password.reset();
  alarmActivateScreen();
}

void alarmActivateScreen() {
  Serial.print("ALARMA ACTIVADA");
  Serial.println("alarmActivateScreen()");
  delay(2000);

}

void desactivate(){
alarmActive=0;
alarmStatus=0;
resetSensors();
password.reset();
alarmDesactivateScreen();

}

void alarmDesactivateScreen() {
  Serial.print("ALARMA DESACTIVADA");
  digitalWrite(redLed,LOW);
  digitalWrite(greenLed,HIGH);
  Serial.println("alarmDesactivateScreen()");
  delay(2000);
}

void resetSensors(){
  //  digitalWrite(buzzer,LOW);
  PUERTA1=false;
  PIR1=false;
}

void newPassword(){
  newPassScreen();

}


void blink(){
  digitalWrite(greenLed,HIGH);
  delay(50);
  digitalWrite(greenLed,LOW);
  if (alarmStatus==0) {
  delay(50);
  digitalWrite(greenLed,HIGH);

  }}
