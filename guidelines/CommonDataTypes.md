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

### Percent values

* Services **MUST** represent percentages as a number, where the number represents the decimal representation of the percentage. For example, `0.01` represents `1%`.
* Services **COULD** provide a human-readable version of the percentage, if appropriate in the context of the API, clearly identifying the field with a suffix (e.g. `Percentage`, `AsPercent`, `DisplayPercent`)

Examples

```json
{
    "interestRate": 0.0143
}
```

```json
{
    "subsidy": 0.02,
    "subsidyPercentage": 2
}
```

### Variables in text from APIs

Some APIs may present customer friendly strings of text that can be presented on the front end. These strings may have variable content within them from other parts of the API response.

* Services **MUST** represent these parameters with a single dollar symbol followed by a set of curly braces within the string. For example, `"${paymentDate}"`
* Services **MUST** follow other standards when they apply, including the money standard above. 
* Services **MUST NOT** imply further formatting such as the currency symbol or it's location ahead or after the variable. E.g. `"Make a payment of ${paymentCurrency} ${payment}"` is NOT permitted.
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
    "reason": "Lenders see customers who made a transaction after ${timestamps.startAt} higher risk.",
    "timestamps": {
        "startAt": "2023-03-21T15:15:27+00:00",
        "expiryAt": "2023-03-22T01:10:00+00:00",
    }
}
```

---
