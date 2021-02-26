import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRecoilValue } from 'recoil';
import IconImage from '../assets/profile.png';
import { Locate } from '../states/atom';
import i18n from '../lang/i18n';

const NoPermission = () => {
  const LocateData = useRecoilValue(Locate);
  return (
    <Layout style={styles.container} locate={LocateData}>
      <Image
        style={styles.icon}
        source={IconImage}
      />
      <Text style={{ fontWeight: 'bold' }}>{i18n.t('NoPermission.Msg')}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp('50%'),
    height: hp('20%'),
    margin: 10,
    borderRadius: 15,
  },
});

export default NoPermission;
