# Common Data Type Guidelines

For data types that repeat across many APIs we want a consistent approach to represent the data to avoid any misinterpretation of the data or conversion errors.

### Money

* Services **MUST** include the 3 letter [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) currency code when field(s) representing a monetary amount are present.
* Services **SHOULD** use a single currency code field when multiple monetary fields are present and the currency is the same for all of the fields. 
* Services **MUST NOT** represent the amount as minor unit where the currency has a major and minor unit. For example, £12.34 should be represented as 12.34, not 1234.
* Services **SHOULD** represent the amount as a number, to avoid string parsing and to allow the deserialisers to deserialise directly into the native representation (e.g. decimal in .NET).

Examples
```json
{
    "paymentCard": "1234567890123456",
    "amount": {
        "currency": "GBP",
        "value": 123.45
    }
}
```

```json
{
    "balance": 1234.33,
    "requestedPayment": 10,
    "recommendedPayment": 100,
    "interestAccrued": 12.88,
    "currency": "GBP"
}
```

### Variables in text from APIs

Some APIs may present customer friendly strings of text that can be presented on the front end. These strings may have variable content within them from other parts of the API response.

* Services **MUST** represent these parameters with a single dollar symbol followed by a set of curly braces within the string. For example, `"${paymentDate}"`
* Services **MUST** follow other standards when they apply, including the money example above. Formatting of the currency symbol or it's location ahead or after the value **MUST NOT** be sent from the service. E.g. `"Make a payment of ${payment}"` instead of `"Make a payment of ${paymentCurrency} ${payment}"`.
* Services **SHOULD** use the ubiquitous name of the value for the variable, where possible. This may not always be possible due to the above point with currency and payment.

Examples
```json
{
    "callToAction": "Make a payment of ${payment}",
    "payment": {
        "currency": "GBP",
        "value": 20.0
    }
}
```

```json
{
    "reason": "Lenders see customers who made a transaction after ${startAt} higher risk.",
    "startAt": "2023-03-21T15:15:27+00:00",
}
```

---
