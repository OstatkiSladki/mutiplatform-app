import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SectionTitle } from '../../../shared/ui/section-title';
import { Grid } from '../../../shared/ui/layout';
import { OfferCard } from '../../../entities/offer/ui/OfferCard';
import { theme } from '../../../shared/config/theme';

export const OffersSection = () => {
  return (
    <View style={styles.container}>
      <SectionTitle>Surprise Boxes</SectionTitle>
      <Grid columns={2} gap={2}>
        <OfferCard 
          title="Bakery Box" 
          price="$4.99" 
          imageUrl="https://via.placeholder.com/150" 
        />
        <OfferCard 
          title="Cafe Box" 
          price="$3.99" 
          imageUrl="https://via.placeholder.com/150" 
        />
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[6],
  },
});