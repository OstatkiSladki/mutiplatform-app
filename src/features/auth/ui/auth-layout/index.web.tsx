import { Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../../../shared/ui/screen';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import type { AuthLayoutProps } from './auth-layout.types';
import { AUTH_CARD_MAX_WIDTH, styles } from './auth-layout.styles';

export type { AuthLayoutProps } from './auth-layout.types';

/** Веб: прежний layout с `Screen` и карточкой на md+. Native — см. `index.tsx` → `index.mobile`. */
export const AuthLayout = ({
  title,
  subtitle,
  children,
  onBackPress: _onBackPress,
  footer,
}: AuthLayoutProps) => {
  const { isWeb, isAtLeast } = useBreakpoint();
  const isWebCard = isWeb && isAtLeast('md');

  const body = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.form}>{children}</View>
      {footer ? (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{footer.text}</Text>
          <TouchableOpacity onPress={footer.onLinkPress} activeOpacity={0.7}>
            <Text style={styles.footerLink}>{footer.linkLabel}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );

  return (
    <Screen
      scroll
      keyboardAware
      maxWidth={isWebCard ? AUTH_CARD_MAX_WIDTH : undefined}
      contentStyle={isWebCard ? styles.containerWeb : styles.container}
    >
      {isWebCard ? <View style={styles.card}>{body}</View> : body}
    </Screen>
  );
};
