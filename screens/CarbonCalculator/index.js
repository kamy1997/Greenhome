 import React, { useState, useEffect,Modal  } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { COLORS, FONTS, darkGreen } from "../../components/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const SEUIL = 5;

const CarbonCalculator = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Combien de kilomètres conduisez-vous chaque jour ?",
      emissions: [0.2, 0.5, 1.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Moins de 10 km", "Entre 10 km et 50 km", "Plus de 50 km"],
    },
    {
      id: 2,
      question: "Combien de viande mangez-vous par semaine ?",
      emissions: [1.0, 2.0, 3.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Moins de 3 fois", "3 à 7 fois", "Plus de 7 fois"],
    },
    {
      id: 3,
      question: "Utilisez-vous l'énergie solaire à la maison ?",
      emissions: [-0.3, 0.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Oui", "Non"],
    },
    {
      id: 4,
      question: "À quelle fréquence prenez-vous l'avion chaque année ?",
      emissions: [0.0, 5.0, 10.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Jamais", "1 à 3 fois", "Plus de 3 fois"],
    },
    {
      id: 5,
      question: "Combien de fois par semaine utilisez-vous des produits jetables en plastique ?",
      emissions: [0.0, 1.5, 3.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Jamais", "1 à 3 fois", "Plus de 3 fois"],
    },
    {
      id: 6,
      question: "Recyclez-vous régulièrement vos déchets ?",
      emissions: [-0.5, 0.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Oui", "Non"],
    },
    {
      id: 7,
      question: "À quelle fréquence achetez-vous des produits locaux et de saison ?",
      emissions: [-1.5, 0.5, 0.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Souvent", "Rarement", "Jamais"],
    },
    {
      id: 8,
      question: "Utilisez-vous des ampoules à économie d'énergie ?",
      emissions: [-0.2, 0.0], // Émissions pour chaque option de réponse
      selectedOption: 0, // 0 pour aucune option sélectionnée
      options: ["Oui", "Non"],
    },
  ]);


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [empreinteCarboneText, setEmpreinteCarboneText] = useState('');
  const [animatedValues, setAnimatedValues] = useState(
      questions.map(() => new Animated.Value(0))
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAlertResult, setShowAlertResult] = useState(false);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);


  const handleAnswer = (questionId, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionId - 1] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);

    setAnsweredQuestionsCount(answeredQuestionsCount + 1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };


  const calculateTotalEmissions = () => {
    const totalEmissions = selectedOptions.reduce((total, optionIndex, index) => {
      const question = questions[index];
      if (optionIndex > 0) {
        // Ajoutez les émissions de l'option sélectionnée au total
        return total + question.emissions[optionIndex - 1];
      }
      return total;
    }, 0);

    setTotalEmissions(totalEmissions);
    setEmpreinteCarboneText(`Votre empreinte carbone est : ${totalEmissions} kg CO2`);
    setShowAlertResult(true);
    Alert.alert(
        'Votre Empreinte Carbone \n🌿🌎',
        `\n Félicitations ! Votre empreinte carbone est de ${totalEmissions} kg CO2, \n\n Ce qui est un excellent début pour contribuer à un environnement plus propre et plus vert. Continuez à faire des choix écologiques pour réduire davantage votre empreinte carbone !`,
        [{ text: 'OK' }]
    );
  };

  const showAlert = () => {
    const answeredQuestions = selectedOptions.filter((optionIndex) => optionIndex > 0).length;

    if (answeredQuestions >= 7) {
      if (totalEmissions > SEUIL) {
        Alert.alert(
            'Alerte',
            'Vous êtes au-dessus du seuil d\'empreinte carbone. Veuillez prendre des mesures pour réduire votre impact environnemental.',
            [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
            'Félicitations',
            'Vous êtes en dessous du seuil d\'empreinte carbone. Continuez vos efforts pour rester écologique !',
            [{ text: 'OK' }]
        );
      }
    } else {
      Alert.alert(
          'Attention',
          `Vous devez répondre à au moins 7 questions pour obtenir un résultat. Vous en avez répondu à ${answeredQuestions} jusqu'à présent.`,
          [{ text: 'OK' }]
      );
    }
  };

  const [totalEmissions, setTotalEmissions] = useState(0);

  const animateQuestion = (questionIndex) => {
    Animated.timing(animatedValues[questionIndex], {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateQuestion(currentQuestion);
  }, [currentQuestion]);


  return (
      <ScrollView contentContainerStyle={styles.container}>
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
                style={{
                  marginTop:20,

                }}


            />
          </TouchableOpacity>

          <Text style={{ ...FONTS.h1,fontWeight:'700', marginTop: 15,marginBottom: 30, }}>CarbonCalculator</Text>

        </View>
        <Text style={styles.header}>Calculez votre empreinte carbone</Text>
        {questions.map((q, index) => (
            <Animated.View

                key={q.id}
                style={[
                  styles.questionContainer,
                  {
                    opacity: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                    transform: [
                      {
                        translateY: animatedValues[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      },
                    ],
                  },
                ]}
            >
              <Text style={styles.questionText}>{q.question}</Text>
              <View>

                {q.options.map((option, optionIndex) => (
                    <TouchableOpacity
                        key={optionIndex}
                        style={styles.option}
                        onPress={() => handleAnswer(q.id, optionIndex + 1)}
                    >
                      <RadioButton labelHorizontal={true}>
                        <RadioButtonInput
                            obj={{ label: option, value: optionIndex + 1 }}
                            index={optionIndex}
                            isSelected={selectedOptions[index] === optionIndex + 1}
                            onPress={() => handleAnswer(q.id, optionIndex + 1)}
                            borderWidth={1}
                            buttonInnerColor={'#A1E2B0FF'}
                            buttonOuterColor={'black'}
                            buttonSize={16}
                            buttonOuterSize={24}
                        />
                        <RadioButtonLabel
                            obj={{ label: option, value: optionIndex + 1 }}
                            index={optionIndex}
                            onPress={() => handleAnswer(q.id, optionIndex + 1)}
                            labelStyle={styles.radioText}
                        />
                      </RadioButton>
                    </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
        ))}
        {answeredQuestionsCount >= 7 && (
            <>
              <Button
                  title="Calculer l'empreinte carbone"
                  onPress={calculateTotalEmissions}
                  buttonStyle={styles.button}
              />
              <Button
                  title="Vérifier l'empreinte carbone"
                  onPress={showAlert}
                  buttonStyle={styles.button}
              />
            </>
        )}




        {/* Modal pour afficher l'empreinte carbone */}
        {/* <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{empreinteCarboneText}</Text>
            <Button title="Fermer" onPress={closeModal} buttonStyle={styles.modalButton} />
          </View>
        </View>
      </Modal> */}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,

  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,


  },
  radioText: {
    marginRight: 20,
    marginLeft: 10,
    fontSize: 16,

  },
  button: {
    backgroundColor: '#A1E2B0FF',
    borderRadius: 5,
    marginTop: 20,

  },

});

export default CarbonCalculator;
