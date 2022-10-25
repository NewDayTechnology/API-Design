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

---
