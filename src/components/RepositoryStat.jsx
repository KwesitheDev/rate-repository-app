/* eslint-disable react/prop-types */
import React from 'react'
import { View } from 'react-native'
import Text from './Text'
import theme from '../../theme'
const styles = {
    statItem: {
        alignItems: 'center'
    },
    value: {
        fontWeight: theme.fontWeights.bold,
    }, 
    label: {
        color: theme.colors.textSecondary
    }


}


const RepositoryStat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.value} >{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default RepositoryStat;