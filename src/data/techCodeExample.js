export const TechCodeExample = {
    next: `import { useState } from 'react';

export default function Home({ initialData }) {
  const [data, setData] = useState(initialData);

  // Function to refresh data from the API
  async function refreshData() {
    const response = await fetch('/api/data');
    const newData = await response.json();
    setData(newData.data);
  }

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>Data from API: {data.join(', ')}</p>
      <button onClick={refreshData}>Refresh Data</button>
    </div>
  );
}

// This function runs on the server for initial page load
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/data');
  const initialData = await response.json();

  return { props: { initialData: initialData.data } };
}
`,
    docker: `version: '3.8'
services:
  web:
    build: ./web
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:12
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql

  nginx:
    build: ./nginx
    ports:
      - "80:80"
    depends_on:
      - web
`,
    python: `import asyncio
import aiohttp
import requests
from bs4 import BeautifulSoup
import pandas as pd
import matplotlib.pyplot as plt

# Function for synchronous web scraping
def scrape_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    numbers = [int(s.text) for s in soup.find_all('span', class_='number')]
    return numbers

# Function for asynchronous web scraping
async def async_scrape_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            text = await response.text()
            soup = BeautifulSoup(text, 'html.parser')
            numbers = [int(s.text) for s in soup.find_all('span', class_='number')]
            return numbers

# Function for data processing
def process_data(data):
    df = pd.DataFrame(data, columns=['Value'])
    df['RollingAverage'] = df['Value'].rolling(window=5).mean()
    return df

# Function for data visualization
def plot_data(df):
    plt.plot(df.index, df['Value'], label='Value')
    plt.plot(df.index, df['RollingAverage'], label='Rolling Average', linestyle='--')
    plt.xlabel('Index')
    plt.ylabel('Values')
    plt.title('Data Visualization')
    plt.legend()
    plt.show()

# Async main function
async def main(urls):
    tasks = [asyncio.create_task(async_scrape_data(url)) for url in urls]
    results = await asyncio.gather(*tasks)
    return results

# URLs for demonstration (Replace with actual URLs)
urls = ["http://example.com/data1", "http://example.com/data2"]

# Run the async main function and process/visualize data
scraped_data = asyncio.run(main(urls))
for data in scraped_data:
    df = process_data(data)
    plot_data(df)
`,
    react: `import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Complex Dummy Component</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplexDummyComponent;
`,
    php: `<?php
// DB configuration
$host = 'localhost';
$db   = 'your_database';
$user = 'your_username';
$pass = 'your_password';
$charset = 'utf8mb4';

// DSN (Data Source Name)
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Define a class
class FileManager {
    public function readFile($filename) {
        return file_get_contents($filename);
    }

    public function writeFile($filename, $content) {
        file_put_contents($filename, $content);
    }
}

// Create an instance of the class
$fileManager = new FileManager();

// Process form data and interact with DB and file
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assuming form fields are 'username' and 'content'
    $username = $_POST['username'];
    $content = $_POST['content'];

    // Write content to a file
    $fileManager->writeFile("user_data.txt", $content);

    // Insert data into database
    $stmt = $pdo->prepare('INSERT INTO users (username, content) VALUES (?, ?)');
    $stmt->execute([$username, $content]);

    echo "Data saved successfully!";
}

?>`,
    angular: `import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

interface Item {
    id: number;
    name: string;
}

@Component({
    selector: 'app-item',
    template: 
        '<div>
            <input [(ngModel)]="newItemName" placeholder="Item name">
            <button (click)="addItem()">Add Item</button>
            <ul>
                <li *ngFor="let item of items">{{ item.name }}</li>
            </ul>
        </div>'
    ,
})
class ItemComponent implements OnInit {
    newItemName: string = '';
    items: Item[] = [];
    nextId: number = 1;

    ngOnInit() {
        this.items = [{ id: 0, name: 'Example item' }];
    }

    addItem() {
        if (this.newItemName) {
            this.items.push({ id: this.nextId++, name: this.newItemName });
            this.newItemName = '';
        }
    }
}

@NgModule({
    declarations: [ItemComponent],
    imports: [BrowserModule, FormsModule],
    bootstrap: [ItemComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
`,
    firebase: `// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const database = firebase.database();

// User Authentication Functions
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("User created successfully!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Logged in successfully!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Database Functions
function writeData() {
    const data = document.getElementById('data').value;
    database.ref('data/').set({
        content: data
    });
}

function readData() {
    database.ref('data/').get().then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('databaseOutput').innerText = snapshot.val().content;
        } else {
            document.getElementById('databaseOutput').innerText = "No data available";
        }
    }).catch((error) => {
        console.error(error);
    });
}
`,
    flutter: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: CounterScreen(),
    );
  }
}

class CounterScreen extends StatefulWidget {
  @override
  _CounterScreenState createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _decrementCounter() {
    setState(() {
      _counter--;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Simple Counter App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                ElevatedButton(
                  onPressed: _decrementCounter,
                  child: Text('-'),
                ),
                ElevatedButton(
                  onPressed: _incrementCounter,
                  child: Text('+'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
`,
    kubernettes: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webserver
        image: nginx:latest
        ports:
        - containerPort: 80

---

apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  type: LoadBalancer
  selector:
    app: webapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
`,
    sql: `-- Create a new database
CREATE DATABASE IF NOT EXISTS demo_db;
USE demo_db;

-- Create a table named 'employees'
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    salary DECIMAL(10, 2),
    hired_date DATE
);

-- Insert data into 'employees'
INSERT INTO employees (name, position, salary, hired_date) VALUES
('Alice', 'Developer', 70000, '2018-04-10'),
('Bob', 'Designer', 60000, '2019-01-15'),
('Charlie', 'Manager', 80000, '2017-09-23');

-- Select all records from 'employees'
SELECT * FROM employees;

-- Update a record
UPDATE employees SET salary = 75000 WHERE name = 'Alice';

-- Select a specific record
SELECT * FROM employees WHERE name = 'Alice';

-- Delete a record
DELETE FROM employees WHERE name = 'Bob';

-- Select all records to show the update and delete effects
SELECT * FROM employees;

-- Drop the table if you want to clean up
-- DROP TABLE employees;

-- Drop the database if you want to clean up
-- DROP DATABASE demo_db;
`,
    swift: `import Foundation

// Define a 'Person' struct
struct Person {
    var name: String
    var age: Int

    // Function to display info about the person
    func displayInfo() {
        print("Name: \(name), Age: \(age)")
    }

    // Function to check if the person is an adult
    func isAdult() -> Bool {
        return age >= 18
    }
}

// Creating instances of 'Person'
let person1 = Person(name: "Alice", age: 24)
let person2 = Person(name: "Bob", age: 17)

// Using the struct's methods
person1.displayInfo() // Output: Name: Alice, Age: 24
person2.displayInfo() // Output: Name: Bob, Age: 17

// Checking if the person is an adult
if person1.isAdult() {
    print("\(person1.name) is an adult.")
} else {
    print("\(person1.name) is not an adult.")
}

if person2.isAdult() {
    print("\(person2.name) is an adult.")
} else {
    print("\(person2.name) is not an adult.")
}
`,
    vue: `new Vue({
  el: '#app',
  data: {
      message: 'Hello Vue.js!',
      counter: 0
  },
  methods: {
      incrementCounter() {
          this.counter += 1;
      }
  }
});`,
    java: `public class BankAccountDemo {
  public static void main(String[] args) {
      BankAccount account = new BankAccount("John Doe", 1000.00);
      System.out.println("Initial Account Balance: " + account.getBalance());

      account.deposit(500.00);
      System.out.println("Balance after deposit: " + account.getBalance());

      try {
          account.withdraw(2000.00);
      } catch (InsufficientFundsException e) {
          System.out.println("Error: " + e.getMessage());
      }

      System.out.println("Final Account Balance: " + account.getBalance());
  }
}

class BankAccount {
  private String owner;
  private double balance;

  public BankAccount(String owner, double initialBalance) {
      this.owner = owner;
      this.balance = initialBalance;
  }

  public void deposit(double amount) {
      balance += amount;
  }

  public void withdraw(double amount) throws InsufficientFundsException {
      if (amount > balance) {
          throw new InsufficientFundsException("Insufficient funds for withdrawal");
      }
      balance -= amount;
  }

  public double getBalance() {
      return balance;
  }
}

class InsufficientFundsException extends Exception {
  public InsufficientFundsException(String message) {
      super(message);
  }
}
`,
    cSharp: `using System;
using System.Collections.Generic;

namespace LibraryDemo {
    class Program {
        static void Main(string[] args) {
            var library = new Library();

            library.AddBook(new Book("1984", "George Orwell"));
            library.AddBook(new Book("To Kill a Mockingbird", "Harper Lee"));

            Console.WriteLine("Books in library:");
            foreach (var book in library.Books) {
                Console.WriteLine($"{book.Title} by {book.Author}");
            }
        }
    }

    public class Library {
        public List<Book> Books { get; private set; }

        public Library() {
            Books = new List<Book>();
        }

        public void AddBook(Book book) {
            Books.Add(book);
        }
    }

    public class Book {
        public string Title { get; private set; }
        public string Author { get; private set; }

        public Book(string title, string author) {
            Title = title;
            Author = author;
        }
    }
}
`,
    svelte: `<script>
import { onMount } from 'svelte';

let posts = [];
let isLoading = true;
let error = '';

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        posts = await response.json();
    } catch (err) {
        error = err.message;
    } finally {
        isLoading = false;
    }
}

onMount(() => {
    fetchPosts();
});
</script>

<main>
<h1>Posts</h1>
{#if isLoading}
    <p>Loading...</p>
{:else if error}
    <p>Error: {error}</p>
{:else}
    <ul>
        {#each posts as post}
            <li>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </li>
        {/each}
    </ul>
{/if}
</main>
`,
    rust: `use std::env;
use std::fs;
use std::collections::HashMap;
use std::error::Error;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: {} <filename>", args[0]);
        std::process::exit(1);
    }
    let filename = &args[1];

    match read_and_process_file(filename) {
        Ok(word_count) => {
            for (word, count) in word_count {
                println!("{}: {}", word, count);
            }
        }
        Err(e) => {
            eprintln!("Error processing file: {}", e);
        }
    }
}

fn read_and_process_file(filename: &str) -> Result<HashMap<String, u32>, Box<dyn Error>> {
    let contents = fs::read_to_string(filename)?;
    let mut word_count = HashMap::new();

    for word in contents.split_whitespace() {
        let count = word_count.entry(word.to_lowercase()).or_insert(0);
        *count += 1;
    }

    Ok(word_count)
}
`,
    golang: `package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", handler)
    log.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
    log.Println("Received Request")
    fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
}
`,
    webpack: `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};`,
    sb: `package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void getAllUsers() {
        // Mock data
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");
        user.setEmail("test@example.com");

        when(userRepository.findAll()).thenReturn(Collections.singletonList(user));

        // Test
        List<User> userList = userService.getAllUsers();
        assertEquals(1, userList.size());
        assertEquals("testUser", userList.get(0).getUsername());
    }
}
`,
    rxjs: `import { interval, Subject, multicast } from 'rxjs';

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log(observerA: ${'v'}),
});
// We should call connect() here, because the first
// subscriber to multicasted is interested in consuming values
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(observerB: ${'v'}),
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// We should unsubscribe the shared Observable execution here,
// because multicasted would have no more subscribers after this
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);`,
};
