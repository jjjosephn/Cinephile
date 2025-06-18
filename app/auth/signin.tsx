import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { signIn } from '@/services/appwrite' 
import { images } from '@/constants/images' 
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const SignIn = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({ email: '', password: '' });
   const router = useRouter();

   const validateForm = () => {
      const newErrors = { email: '', password: '' };
      let isValid = true;

      if (!email.trim()) {
         newErrors.email = 'Email is required';
         isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = 'Please enter a valid email address';
         isValid = false;
      }

      if (!password.trim()) {
         newErrors.password = 'Password is required';
         isValid = false;
      } else if (password.length < 6) {
         newErrors.password = 'Password must be at least 6 characters';
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };

   const handleSignIn = async () => {
      if (!validateForm()) return;

      setIsLoading(true);
      try {
         await signIn(email.trim(), password);
         
         Alert.alert('Success', 'Welcome back!', [
            { text: 'OK', onPress: () => {
               router.replace('/(tabs)')
               console.log('Navigate to home screen');
            }}
         ]);
      } catch (error) {
         let errorMessage = 'An error occurred during sign in';
         if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
            if ((error as any).message.includes('Invalid credentials')) {
               errorMessage = 'Invalid email or password';
            } else if ((error as any).message.includes('network')) {
               errorMessage = 'Network error. Please check your connection';
            }
         }
         Alert.alert('Sign In Failed', errorMessage);
      } finally {
         setIsLoading(false);
      }
   };

   const handleBackPress = () => {
      router.replace('/')
   }
   const handleForgotPassword = () => {
      console.log('Navigate to forgot password');
   };

   const handleSignUp = () => {
      router.replace('/auth/signup');
      console.log('Navigate to sign up');
   };

   return (
      <KeyboardAvoidingView 
         style={styles.container} 
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
         <Image
         source={images.bg}
         style={styles.backgroundImage}
         resizeMode="cover"
         />
         
         <View style={styles.overlay} />

         <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
         >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
         </TouchableOpacity>
         
         <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
         
         <View style={styles.header}>
            <Text style={styles.title}>Welcome Cinephile</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
         </View>

         <View style={styles.form}>
            
            <View style={styles.inputContainer}>
               <Text style={styles.label}>Email</Text>
               <TextInput
                  style={[styles.input, errors.email ? styles.inputError : null]}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={(text) => {
                     setEmail(text);
                     if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
               />
               {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
               <Text style={styles.label}>Password</Text>
               <TextInput
                  style={[styles.input, errors.password ? styles.inputError : null]}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={(text) => {
                     setPassword(text);
                     if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
               />
               {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.signInButton, isLoading && styles.buttonDisabled]}
               onPress={handleSignIn}
               disabled={isLoading}
               activeOpacity={0.8}
            >
               <Text style={styles.signInButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
               </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
               <View style={styles.dividerLine} />
               <Text style={styles.dividerText}>or</Text>
               <View style={styles.dividerLine} />
            </View>

            <View style={styles.signUpContainer}>
               <Text style={styles.signUpText}>Don't have an account? </Text>
               <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
               </TouchableOpacity>
            </View>

         </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}

export default SignIn

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#0F172A', // Fallback color
   },
   backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
   },
   overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
   },
   backButton: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 60 : 40, 
      left: 20,
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 20,
      padding: 8,
   },
   scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 40,
   },
   header: {
      alignItems: 'center',
      marginBottom: 32,
   },
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 8,
   },
   subtitle: {
      fontSize: 16,
      color: '#94A3B8',
      textAlign: 'center',
   },
   form: {
      width: '100%',
   },
   inputContainer: {
      marginBottom: 20,
   },
   label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: 8,
   },
   input: {
      backgroundColor: '#1E293B',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#334155',
   },
   inputError: {
      borderColor: '#EF4444',
   },
   errorText: {
      color: '#EF4444',
      fontSize: 14,
      marginTop: 4,
   },
   forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginBottom: 32,
   },
   forgotPasswordText: {
      color: '#3B82F6',
      fontSize: 14,
      fontWeight: '500',
   },
   signInButton: {
      backgroundColor: '#3B82F6',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 24,
   },
   buttonDisabled: {
      opacity: 0.6,
   },
   signInButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
   },
   divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
   },
   dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#334155',
   },
   dividerText: {
      color: '#94A3B8',
      paddingHorizontal: 16,
      fontSize: 14,
   },
   signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   signUpText: {
      color: '#94A3B8',
      fontSize: 16,
   },
   signUpLink: {
      color: '#3B82F6',
      fontSize: 16,
      fontWeight: '600',
   },
})