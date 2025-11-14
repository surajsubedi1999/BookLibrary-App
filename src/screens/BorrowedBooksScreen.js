import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Alert 
} from 'react-native';
import { useBook } from '../context/BookContext';

export default function BorrowedBooksScreen({ navigation }) {
  const { state, dispatch } = useBook();

  const handleReturn = (bookId, bookTitle) => {
    Alert.alert(
      'Return Book',
      `Are you sure you want to return "${bookTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Return Book', 
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'RETURN_BOOK', payload: bookId });
            Alert.alert('Book Returned ✅', 'Thank you for returning the book!');
          }
        }
      ]
    );
  };

  const renderBorrowedBook = ({ item }) => (
    <View style={styles.borrowedItem}>
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
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => handleReturn(item.id, item.title)}
      >
        <Text style={styles.returnButtonText}>↩ Return</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Borrowed Books</Text>
        <View style={styles.borrowCountContainer}>
          <Text style={styles.borrowCount}>
            {state.borrowedBooks.length} of 3 books borrowed
          </Text>
          <View style={[
            styles.countCircle, 
            state.borrowedBooks.length >= 3 ? styles.fullCount : styles.normalCount
          ]}>
            <Text style={styles.countText}>{state.borrowedBooks.length}/3</Text>
          </View>
        </View>
      </View>

      {state.borrowedBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📚</Text>
          <Text style={styles.emptyTitle}>No books borrowed yet!</Text>
          <Text style={styles.emptyText}>
            Browse our library and borrow some interesting books to read.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('BookList')}
          >
            <Text style={styles.browseButtonText}>Browse Library</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={state.borrowedBooks}
          renderItem={renderBorrowedBook}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa'
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center'
  },
  borrowCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  borrowCount: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500'
  },
  countCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  normalCount: {
    backgroundColor: '#d4edda'
  },
  fullCount: {
    backgroundColor: '#f8d7da'
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#155724'
  },
  listContent: {
    paddingBottom: 16
  },
  borrowedItem: {
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
    borderLeftColor: '#e74c3c'
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
  returnButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  returnButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 12,
    textAlign: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22
  },
  browseButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});