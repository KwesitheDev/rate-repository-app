/* eslint-disable react/prop-types */
import React from 'react'
import { View } from 'react-native'
import Text from './Text'
import theme from '../../theme'
import { formatThousands } from '../utils';

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
    <Text style={styles.value} >{formatThousands(value)}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default RepositoryStat;