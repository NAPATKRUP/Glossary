import React from 'react';
import { Layout } from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import colors from '../../constants/colors';

const CreateVocab = ({ item, handleRemove, index }) => (
  <TouchableOpacity delayPressIn={0} onPress={() => handleRemove(index)}>
    <Layout style={styles.vocabCard}>
      <Text style={{ fontSize: 30 }}>{item.en}</Text>
      <Text style={{ fontSize: 20 }}>{item.th}</Text>
    </Layout>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  vocabCard: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    marginHorizontal: 50,
  },
});

export default CreateVocab;
