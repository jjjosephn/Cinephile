import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { signUp } from '@/services/appwrite' 
import { images } from '@/constants/images' 
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons' 

const SignUp = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
   const router = useRouter();

   const validateForm = () => {
      const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
      let isValid = true;

      if (!name.trim()) {
         newErrors.name = 'Name is required';
         isValid = false;
      } else if (name.trim().length < 2) {
         newErrors.name = 'Name must be at least 2 characters';
         isValid = false;
      }

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
      } else if (password.length < 8) {
         newErrors.password = 'Password must be at least 8 characters';
         isValid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
         newErrors.password = 'Password must contain uppercase, lowercase, and number';
         isValid = false;
      }

      if (!confirmPassword.trim()) {
         newErrors.confirmPassword = 'Please confirm your password';
         isValid = false;
      } else if (password !== confirmPassword) {
         newErrors.confirmPassword = 'Passwords do not match';
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };

   const handleSignUp = async () => {
      if (!validateForm()) return;

      setIsLoading(true);
      try {
         await signUp(email.trim(), password, name.trim());
         
         Alert.alert('Welcome to Cinephile!', 'Your account has been created successfully.', [
         { text: 'Get Started', onPress: () => {
            router.replace('/(tabs)');
         }}
         ]);
         
      } catch (error) {
         let errorMessage = 'An error occurred during sign up';

         if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
            const errMsg = (error as any).message as string;
            if (errMsg.includes('already exists') || errMsg.includes('duplicate')) {
               errorMessage = 'An account with this email already exists';
            } else if (errMsg.includes('network')) {
               errorMessage = 'Network error. Please check your connection';
            } else if (errMsg.includes('password')) {
               errorMessage = 'Password does not meet requirements';
            }
         }
         Alert.alert('Sign Up Failed', errorMessage);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSignIn = () => {
      router.replace('/auth/signin');
   };

   const handleBackPress = () => {
      router.replace('/');
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
            <Text style={styles.title}>Become a Cinephile</Text>
            <Text style={styles.subtitle}>Create your account to discover amazing movies</Text>
         </View>

         <View style={styles.form}>
            <View style={styles.inputContainer}>
               <Text style={styles.label}>Full Name</Text>
               <TextInput
                  style={[styles.input, errors.name ? styles.inputError : null]}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={(text) => {
                     setName(text);
                     if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
               />
               {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

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
                  placeholder="Create a strong password"
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

            <View style={styles.inputContainer}>
               <Text style={styles.label}>Confirm Password</Text>
               <TextInput
                  style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={(text) => {
                     setConfirmPassword(text);
                     if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
               />
               {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>

            <View style={styles.requirementsContainer}>
               <Text style={styles.requirementsText}>
               Password must contain at least 8 characters with uppercase, lowercase, and numbers
               </Text>
            </View>

            <TouchableOpacity
               style={[styles.signUpButton, isLoading && styles.buttonDisabled]}
               onPress={handleSignUp}
               disabled={isLoading}
               activeOpacity={0.8}
            >
               <Text style={styles.signUpButtonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
               </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
               <View style={styles.dividerLine} />
               <Text style={styles.dividerText}>or</Text>
               <View style={styles.dividerLine} />
            </View>

            <View style={styles.signInContainer}>
               <Text style={styles.signInText}>Already have an account? </Text>
               <TouchableOpacity onPress={handleSignIn}>
               <Text style={styles.signInLink}>Sign In</Text>
               </TouchableOpacity>
            </View>
         </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}

export default SignUp

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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text readability
   },
   backButton: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 60 : 40, // Account for status bar
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
   requirementsContainer: {
      marginBottom: 24,
   },
   requirementsText: {
      color: '#94A3B8',
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 16,
   },
   signUpButton: {
      backgroundColor: '#3B82F6',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
   },
   buttonDisabled: {
      opacity: 0.6,
   },
   signUpButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
   },
   termsText: {
      color: '#94A3B8',
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 16,
   },
   linkText: {
      color: '#3B82F6',
      fontWeight: '500',
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
   signInContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   signInText: {
      color: '#94A3B8',
      fontSize: 16,
   },
   signInLink: {
      color: '#3B82F6',
      fontSize: 16,
      fontWeight: '600',
   },
})