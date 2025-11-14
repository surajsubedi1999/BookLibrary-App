import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image,
  Alert 
} from 'react-native';
import { useBook } from '../context/BookContext';

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const { state, dispatch } = useBook();

  const handleBorrow = () => {
    if (state.borrowedBooks.length >= 3) {
      Alert.alert(
        'Borrow Limit Reached',
        'You cannot borrow more than 3 books at a time. Please return some books first.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (state.borrowedBooks.find(b => b.id === book.id)) {
      Alert.alert(
        'Already Borrowed',
        'You have already borrowed this book!',
        [{ text: 'OK' }]
      );
      return;
    }

    dispatch({ type: 'BORROW_BOOK', payload: book });
    Alert.alert(
      'Success! 🎉',
      `You have borrowed "${book.title}"`,
      [
        { 
          text: 'View My Books', 
          onPress: () => navigation.navigate('BorrowedBooks') 
        },
        { text: 'Continue Browsing' }
      ]
    );
  };

  const isBorrowed = state.borrowedBooks.find(b => b.id === book.id);

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: book.coverImage }} 
        style={styles.coverImage}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Genre</Text>
            <Text style={styles.metaValue}>{book.genre}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Pages</Text>
            <Text style={styles.metaValue}>{book.pages}</Text>
          </View>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
        
        {!isBorrowed ? (
          <TouchableOpacity style={styles.borrowButton} onPress={handleBorrow}>
            <Text style={styles.borrowButtonText}>📖 Borrow This Book</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.alreadyBorrowedContainer}>
            <Text style={styles.alreadyBorrowedText}>✅ You have borrowed this book</Text>
            <TouchableOpacity 
              style={styles.viewBorrowedButton}
              onPress={() => navigation.navigate('BorrowedBooks')}
            >
              <Text style={styles.viewBorrowedButtonText}>View My Books</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.borrowCount}>
          <Text style={styles.borrowCountText}>
            📚 Currently borrowed: {state.borrowedBooks.length}/3 books
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  coverImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center'
  },
  author: {
    fontSize: 20,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  metaItem: {
    alignItems: 'center'
  },
  metaLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    fontWeight: '600'
  },
  metaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  descriptionContainer: {
    marginBottom: 25
  },
  descriptionLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    textAlign: 'justify'
  },
  borrowButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  borrowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  alreadyBorrowedContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d5f4e6',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#27ae60'
  },
  alreadyBorrowedText: {
    color: '#27ae60',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  viewBorrowedButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#27ae60',
    backgroundColor: 'white'
  },
  viewBorrowedButtonText: {
    color: '#27ae60',
    fontSize: 14,
    fontWeight: 'bold'
  },
  borrowCount: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    marginTop: 10
  },
  borrowCountText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: '600'
  }
});