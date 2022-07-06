# PCI Data

---
**What is it?**
PCI data is cardholder data that is subject to the Payment Card Industry Data Security Standard - PCI-DSS. This inlcudes any information about a card such as the 16 digit Primary Account Number, PAN, the 3 digit CVV number, expiry dates, and the data types in scope are detailed in the standard - https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Standard/PCI-DSS-v4_0.pdf

**Where is it**
**Cardholder data must only be stored, processed, or transmitted within our Cardholder Data Environment - CDE.** 

**How do we secure it**
We **SHOULD NOT transmit personally identifiable information (PII) parameters in the URL (as part of path or query string)** because this information can be inadvertently exposed via client, network, and server logs and other mechanisms. While all communication must be over SSL - we’re protecting against humans (either making a genuine mistake, or those being more malicious).

Consequently, a service **SHOULD accept PII parameters transmitted as headers**.

However, there are many scenarios where the above recommendations cannot be followed due to client or software limitations. To address these limitations, services SHOULD also accept these PII parameters as part of the URL consistent with the rest of these guidelines.

Services that accept PII parameters -- whether in the URL or as headers -- SHOULD be compliant with our privacy policy. This will typically include recommending that clients prefer headers for transmission and implementations adhere to special precautions to ensure that logs and other service data collection are properly handled.
