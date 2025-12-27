plugins {
    kotlin("jvm") version "2.2.0"
    application
}

repositories { mavenCentral() }

application { mainClass.set("aoc2025.MainKt") }

kotlin { jvmToolchain(17) }

dependencies { testImplementation(kotlin("test")) }

tasks.test { useJUnitPlatform() }
