### BAIim Lab:Bezpieczeństwo API Internetowych, podatności w Sieci Web

### Wprowadzenie

Na potrzeby projektu została stworzona aplikacja - real time chat nie posiadająca praktycznie w ogóle zabezpieczeń które należy wykryć - Lab ma formę CTF, w aplikacji można doszukać się więcej podatności niż tych ujętych w zadaniach.

### Uruchomienie

Przed rozpoczęciem zadań należy posiadać oprogramownie Docker i Docker-compose, *preferowane* IDE Virsual Studio Code

1. Należy sklonować repozytorium 

```json
https://github.com/Patr0sss/Bezpieczenstwo-Aplikacji.git
```

1. Wykonać polecenie będąc w katalogu  [**Bezpieczenstwo-Aplikacji**](https://github.com/Patr0sss/Bezpieczenstwo-Aplikacji)

```json
docker-compose up
```

Skonteneryzuje to naszą aplikację i uruchomi stworzone kontenery.

## Zadania

### Zadanie 1 Klucze API

Masz dostęp do kodu źródłowego w którym niezabezpieczone są [m.in](http://m.in/) klucz do tworzenia tokenów JWT,  spróbuj zrozumieć jak generowane są tokeny i spróbuj podszyć się pod innego użytkownika, możesz skorzystać z oprogramowania postman, na jakie sposoby można zabezpieczyć klucze API? 

### Zadanie 2 Szyfrowanie TLS/SSL

Aplikacja korzysta z nieszyfrowanego HTTP, korzystając z oprogramowania typu sniffer  (np. whireshark)podsłuchaj komunikację. jakie wrażliwe informacje można przechwycić? 

### Zadanie 3 SQL Injection

Spróbuj wydobyć wrażliwe dane za pomocą ataku SQL Injection. Jakie kroki można podjąć żeby uchronić aplikację przed takim atakiem i w których obszarach naszego oprogramowania?

### Zadanie 4 Walidacja Danych

W aplikacji została wprowadzona niepełna walidacja danych. Możemy użyć oprogramowania typu Burpsuite/Postman do wprowadzenia nieprawidłowych danych. Spróbuj wprowadzić odpowiednią walidację danych logowania ( podpowiedź: backend/middleware/validinfo.js  )

### Zadanie 5 Broken Object Level Authorization (BOLA)

Znajdź endpointy za pomocą których możesz pozyskać wrażliwe informacje i które nie zostały poprawnie zabezpieczone, posługując się snippetami wprowadź poprawne uwierzytelnianie
