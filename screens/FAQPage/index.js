import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';

const FAQPage = () => {
  const [expanded, setExpanded] = useState([]);

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
    <ScrollView style={styles.container}>
      {faqData.map((faq, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleExpansion(index)}
          style={styles.questionContainer}
        >
          <View style={styles.questionWrapper}>
            <Text style={styles.questionText}>{faq.question}</Text>
            <View style={styles.icon}>
              <Text >{expanded[index] ? '-' : '+'}</Text>
            </View>
          </View>
          <Animated.View style={[styles.answerWrapper, { height: expanded[index] ? 'auto' : 0 }]}>
            <Text style={styles.answerText}>{faq.answer}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor:'white'
  },
  questionContainer: {
    marginBottom: 16,
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
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1B1A',
    borderRadius: 15,
    opacity: 0.8,
  },
  answerWrapper: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    overflow: 'hidden',
  },
  answerText: {
    fontSize: 14,
  },
});

export default FAQPage;