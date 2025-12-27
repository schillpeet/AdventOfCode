# 🎄 Advent of Code 2025

Solutions to the Advent of Code 2025 challenges in Kotlin.

## ⚙️ Setup

Make sure you have JDK 17 installed (Gradle uses the Kotlin JVM toolchain).  
Then build the project:

```shell
$ ./gradlew build
```

## 🎯 Run a Day

Run a specific day and part.  

```shell
./gradlew run --args="3 2"   # Day 3, Part 2
./gradlew run --args="1 1"   # Day 1, Part 1
```

💡 Alternatively, you can set default day and part directly in Main.kt for quick testing without CLI arguments.

## 🧪 Run tests

Run all unit tests for example and puzzle inputs:

```shell
$ ./gradlew test 
```

### 🛠 Generate a new Day

Create a new Day template (including test files) by running:

```shell
$ chmod +x scripts/init_day.sh
$ ./scripts/init_day.sh 3 # creates Day 3
```
