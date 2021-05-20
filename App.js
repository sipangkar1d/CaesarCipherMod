import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const App = () => {
  const [text, onChangeText] = useState("");
  const [data, setData] = useState("Silahkan pilih, Enkripsi atau Dekripsi...");
  
  const _enkrip = () => {
    var kunci1 = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "@",
      "#",
      "$",
      "_",
      "&",
      "-",
      "+",
      "(",
      ")",
      "/",
      "*",
      '"',
      "'",
      ":",
      ";",
      "!",
      "?",
    ];
    var kunci2 = [
      "~",
      "`",
      "|",
      "•",
      "√",
      "π",
      "÷",
      "×",
      "¶",
      "∆",
      "£",
      "¢",
      "€",
      "¥",
      "^",
      "°",
      "=",
      "{",
      "}",
      "\\",
      "%",
      "©",
      "®",
      "™",
      "✓",
      "[",
      "]",
    ];
    //step 1 mengganti plaintext dengan kunci 1 dan kunci 2
    var temp = []
    for (var i = 0; i < text.length; i++) {
      if (text[i] == " " || text[i] == "." || text[i] == ",") {
        temp.push(text[i]);
      }
      else {
        if (i % 2 == 0) {
          temp.push(kunci1[text[i].charCodeAt() - 97])
        }
        else {
          temp.push(kunci2[text[i].charCodeAt() - 97])
        }
      }
    }
    //step 2 merubah menjadi matriks yang memiliki kolom sebanyak 2

    var p = 0
    var matriks = []
    for (var i = 0; i < text.length / 2; i++) {
      matriks.push([])
    }
    for (var i = 0; i < text.length / 2; i++) {
      for (var j = 0; j < 2; j++) {
        matriks[i].push(temp[p])
        p++;
      }
    }
    //step 3 merubah nya menjadi matriks 1 dimensi dimana yang tadinya baris menjadi kolom (kalimat dekripsi pertama)
    var temp = []
    for (var i = 0; i < text.length / 2; i++) {
      temp.push(matriks[i][0])
    }
    for (var i = 0; i < text.length / 2; i++) {
      temp.push(matriks[i][1])
    }
    setData(temp)
    // console.log(matriks);
    console.log(temp)
  };
  const _dekrip = () => {
    var kunci1 = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "@",
      "#",
      "$",
      "_",
      "&",
      "-",
      "+",
      "(",
      ")",
      "/",
      "*",
      '"',
      "'",
      ":",
      ";",
      "!",
    ];
    var kunci2 = [
      "~",
      "`",
      "|",
      "•",
      "√",
      "π",
      "÷",
      "×",
      "¶",
      "∆",
      "£",
      "¢",
      "€",
      "¥",
      "^",
      "°",
      "=",
      "{",
      "}",
      "\\",
      "%",
      "©",
      "®",
      "™",
      "✓",
      "[",
    ];

    //step 1, membuat ciphertext menjadi array
    var temp = []
    for (var i = 0; i < text.length; i++) {
      temp.push(text[i])
    }

    //step 2, membuat menjadi matriks dengan baris sebanyak 2 dan kolom sebanyak ciphertext/2
    var p = 0
    var matriks = []
    for (var i = 0; i < 2; i++) {
      matriks.push([])
    }

    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < text.length / 2; j++) {
        matriks[i].push(temp[p])
        p++
      }
    }

    //step 3, saat matriks sudah menjadi 2 baris dan ciphertext/2 kolom, maka tinggal menyatukannya perkolom
    var temp = []
    for (var i = 0; i < text.length / 2; i++) {
      for (var j = 0; j < 2; j++) {
        temp.push(matriks[j][i])
      }
    }

    //step 4, array dari cipher text sudah tersusun sesuai aturan kunci 1 dan kunci 2, sekarang tinggan membalikkan ciphertext menjadi plaintext
    var plaintext = []
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] == " " || temp[i] == "." || temp[i] == ",") {
        plaintext.push(temp[i]);
      }
      else {
        if (i % 2 == 0) {
          for (var j = 0; j < 26; j++) {
            if (temp[i] == kunci1[j]) {
              var res = String.fromCharCode(j + 97)
              plaintext.push(res);

            }
          }
        }
        else {
          for (var j = 0; j < 26; j++) {
            if (temp[i] == kunci2[j]) {
              var res = String.fromCharCode(j + 97)
              plaintext.push(res);

            }
          }
        }
      }
    }
    setData(plaintext)
  };
  return (
    <View style={styles.container}>
      <View style={styles.judul}>
        <Text style={styles.textJudul}>Caesar Cipher Modifikasi</Text>
      </View>

      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginBottom: -15,
          fontWeight: "bold",
          color: "#696969",
        }}
      >
        Isi paragraf yang ingin di enkripsi/dekripsi :
      </Text>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Ketikkan disini..."
          style={styles.text}
          editable
          multiline
          onChangeText={onChangeText}
          value={text.toLowerCase()}
        />
      </View>

      <View style={styles.button}>
        <View style={styles.btn}>
          <Button title="Enkripsi" onPress={_enkrip} />
        </View>
        <View style={styles.btn}>
          <Button title="Dekripsi" onPress={_dekrip} />
        </View>
      </View>

      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginBottom: -15,
          fontWeight: "bold",
          color: "#696969",
        }}
      >
        Hasil Enkripsi/Dekripsi :
      </Text>
      
      <View style={styles.hasil}>
        <ScrollView>
          <Text style={{ padding: 5 }}>{data}</Text>
        </ScrollView>
      </View>

      <View style={styles.cc}>
        <Text style={styles.textcc}>Kelompok 8 - Tugas Besar Kriptografi</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6D3D7",
  },
  judul: {
    paddingTop: 40,
    backgroundColor: "#04596D",
    elevation: 20,
  },
  textJudul: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: "white",
  },
  textInput: {
    margin: 20,
    backgroundColor: "#FBFBFD",
  },
  text: {
    height: 240,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  button: {
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  btn: {
    marginHorizontal: 25,
    flex: 1,
    width: "100%",
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 7,
    backgroundColor: "#000",
    shadowRadius: 10,
    shadowOffset: { width: 56, height: 13 },
    borderWidth: 0,
    borderRadius: 5,
  },
  hasil: {
    borderWidth: 1,
    margin: 20,
    height: 240,
    backgroundColor: "#FBFBFD",
  },
  cc: {
    height: 40,
    backgroundColor: "#04596D",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  textcc: {
    alignSelf: "center",
    fontSize: 12,
    color: "white",
  },
});
