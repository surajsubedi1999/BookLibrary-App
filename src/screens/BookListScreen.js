import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const booksRef = ref(db, 'books');
    
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const booksArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBooks(booksArray);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <Image 
        source={{ uri: item.coverImage }} 
        style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.genre}>{item.genre}</Text>
        <Text style={styles.pages}>{item.pages} pages</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2c3e50" />
        <Text style={styles.loadingText}>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Books ({books.length})</Text>
      
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity
        style={styles.borrowedButton}
        onPress={() => navigation.navigate('BorrowedBooks')}
      >
        <Text style={styles.borrowedButtonText}>📚 View My Borrowed Books</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center'
  },
  listContent: {
    paddingBottom: 16
  },
  bookItem: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db'
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16
  },
  bookInfo: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4
  },
  author: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4
  },
  genre: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 2
  },
  pages: {
    fontSize: 12,
    color: '#95a5a6'
  },
  arrowContainer: {
    padding: 8
  },
  arrow: {
    fontSize: 20,
    color: '#bdc3c7',
    fontWeight: 'bold'
  },
  borrowedButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  borrowedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});