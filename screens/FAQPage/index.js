import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, darkGreen } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const FAQPage = () => {
  const [expanded, setExpanded] = useState([]);
  const navigation = useNavigation();
  

  const faqData = [
    { question: "Qu'est-ce que Greenhome ?", answer: "Greenhome est une application..." },
    { question: "Comment puis-je ajouter un appareil ?", answer: "Pour ajouter un appareil..." },
    // Ajoutez d'autres questions-réponses ici
  ];

  const toggleExpansion = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
     
    }}
  >
    <ScrollView style={styles.container}>
      <View
        style={{
          marginHorizontal: 12,

          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={28}
            color={COLORS.black}
            style={{marginTop: 20}}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h1,  fontFamily: 'Palatino',fontWeight:'700', marginTop: 15, }}>FAQ</Text>
      </View>
      {faqData.map((faq, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleExpansion(index)}
          style={styles.questionContainer}
        >
          <View style={styles.questionWrapper}>
            <Text style={styles.questionText}>{faq.question}</Text>
            <View style={styles.icon}>
              <Text style={{color:'black'}} >{expanded[index] ? '-' : '+'}</Text>
            </View>
          </View>
          <Animated.View style={[styles.answerWrapper, { height: expanded[index] ? 'auto' : 0 }]}>
            <Text style={styles.answerText}>{faq.answer}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'white',
  
  },
  questionContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    
  },
  questionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1E2B0FF',
    borderRadius: 30,
   
  },
  answerWrapper: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    overflow: 'hidden',
  },
  answerText: {
    fontSize: 14,
  },
});

export default FAQPage;