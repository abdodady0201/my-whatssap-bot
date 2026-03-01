# 🚀 دليل النشر البسيط — WhatyBot
### لغير التقنيين — من الصفر إلى الإطلاق في 30 دقيقة

---

## ✅ ما تحتاجه قبل البداية

| الأداة | الغرض | السعر | الرابط |
|--------|--------|-------|--------|
| حساب GitHub | تخزين الكود | مجاني | github.com |
| حساب Railway | رفع السيرفر | مجاني (500 ساعة/شهر) | railway.app |
| حساب Vercel | رفع الواجهة | مجاني | vercel.com |
| مفتاح OpenAI | الذكاء الاصطناعي | ادفع حسب الاستخدام | platform.openai.com |
| حساب Stripe | استقبال المدفوعات | 0% رسوم ثابتة | stripe.com |
| حساب Meta Developers | ربط واتساب | مجاني | developers.facebook.com |

---

## 🎯 الخطوة 1 — انسخ المشروع (دقيقة واحدة)

1. اذهب إلى: `github.com/whatsybot/starter` (استبدل بالرابط الحقيقي)
2. اضغط الزر الأخضر **"Use this template"**
3. أدخل اسماً للمشروع مثل `my-whatsapp-bot`
4. اضغط **"Create repository"**

✅ **تم! الكود الآن في حسابك على GitHub**

---

## 🗄️ الخطوة 2 — أنشئ قاعدة البيانات (3 دقائق)

1. افتح **railway.app** وسجّل دخول بـ GitHub
2. اضغط **"New Project"** → اختر **"Deploy from GitHub repo"**
3. اختر مشروعك `my-whatsapp-bot`
4. بعد الإنشاء، اضغط **"New"** → **"Database"** → **"Add MongoDB"**
5. اضغط على MongoDB → اضغط **"Connect"** → انسخ **"MongoDB URI"**

> 💡 احفظ هذا الرابط، ستحتاجه لاحقاً

---

## 🔑 الخطوة 3 — احصل على المفاتيح (10 دقائق)

### مفتاح OpenAI:
1. اذهب إلى `platform.openai.com/api-keys`
2. اضغط **"Create new secret key"**
3. انسخ المفتاح (يبدأ بـ `sk-proj-...`)

### مفاتيح Stripe:
1. اذهب إلى `dashboard.stripe.com/apikeys`
2. انسخ **"Secret key"** (يبدأ بـ `sk_live_...`)
3. من Stripe → اذهب إلى **Products** → أنشئ منتجَين:
   - Pro: `$10/month` → انسخ Price ID (يبدأ بـ `price_...`)
   - Business: `$25/month` → انسخ Price ID

### اختر كلمتَين سريتَين:
```
WEBHOOK_VERIFY_TOKEN = أي_كلمة_سرية_مثلاً: whatsybot2025
JWT_SECRET = نص_طويل_عشوائي_مثلاً: my-super-secret-key-xyz-123
```

---

## ⚙️ الخطوة 4 — أضف الإعدادات على Railway (5 دقائق)

1. افتح مشروعك على Railway
2. اضغط على السيرفر الخاص بك
3. اختر تبويب **"Variables"**
4. اضغط **"New Variable"** وأضف كل هذه المتغيرات:

```
MONGODB_URI          = (الرابط الذي نسخته في الخطوة 2)
OPENAI_API_KEY       = (مفتاح OpenAI)
STRIPE_SECRET_KEY    = (مفتاح Stripe)
STRIPE_PRO_PRICE_ID  = (Price ID للخطة Pro)
STRIPE_BIZ_PRICE_ID  = (Price ID للخطة Business)
WEBHOOK_VERIFY_TOKEN = (كلمتك السرية)
JWT_SECRET           = (النص الطويل)
ADMIN_EMAIL          = (بريدك الإلكتروني)
ADMIN_PASSWORD       = (كلمة مرور لوحة الإدارة)
```

5. اضغط **"Deploy"** — انتظر دقيقتَين ⏳

✅ **بعد الانتهاء، انسخ رابط التطبيق على Railway (شيء مثل: `mybot.up.railway.app`)**

---

## 🌐 الخطوة 5 — ارفع الواجهة على Vercel (3 دقائق)

1. اذهب إلى `vercel.com` → سجّل دخول بـ GitHub
2. اضغط **"New Project"** → اختر مستودعك
3. في قسم **"Environment Variables"** أضف:
   ```
   NEXT_PUBLIC_API_URL = https://mybot.up.railway.app
   NEXT_PUBLIC_STRIPE_KEY = pk_live_... (من Stripe → API Keys → Publishable key)
   ```
4. اضغط **"Deploy"** ✅

---

## 📱 الخطوة 6 — ربط واتساب (10 دقائق)

1. اذهب إلى `developers.facebook.com`
2. اضغط **"Create App"** → اختر **"Business"**
3. أضف منتج **"WhatsApp"**
4. من **"API Setup"**:
   - انسخ **Phone Number ID**
   - انسخ **Access Token المؤقت** (أو أنشئ رمزاً دائماً)
5. من **"Configuration"** → **"Webhooks"**:
   - Webhook URL: `https://mybot.up.railway.app/api/whatsapp/webhook`
   - Verify Token: (نفس WEBHOOK_VERIFY_TOKEN الذي أدخلته)
   - اضغط **"Verify and Save"**

> 🎉 **واتساب متصل الآن!**

---

## 🎊 تهانينا! منصتك جاهزة

| الرابط | الوصف |
|--------|--------|
| `vercel-app.vercel.app` | الواجهة للمستخدمين |
| `vercel-app.vercel.app/admin` | لوحة الإدارة |
| `railway-url/api` | الـ API |

---

## 🆘 مشاكل شائعة وحلولها

**❌ السيرفر لا يعمل على Railway:**
- تأكد من إضافة جميع متغيرات البيئة
- راجع سجلات الأخطاء (Logs) على Railway

**❌ واتساب لا يتصل:**
- تأكد أن Webhook URL صحيح وفيه `/webhook` في النهاية
- تأكد من WEBHOOK_VERIFY_TOKEN نفس القيمة في Meta وفي Railway

**❌ الدفع لا يعمل:**
- تأكد أنك تستخدم بيانات Live وليس Test إذا كنت في الإنتاج
- تحقق من Stripe Webhook: أضف `https://railway-url/api/stripe/webhook`

---

## 💰 التكاليف الشهرية (بعد الإطلاق)

| الخدمة | المجاني | المدفوع |
|--------|---------|---------|
| Railway | 500 ساعة/شهر | $5/شهر للمشاريع الكبيرة |
| Vercel | مجاني للمشاريع الصغيرة | $20/شهر |
| MongoDB | 512MB مجاناً | $9/شهر |
| OpenAI | ادفع حسب الاستخدام | ~$0.01 لكل 1000 رسالة |
| **الإجمالي** | **0$ للبداية** | **~$15-35/شهر** |

مع 10 عملاء Pro ($10 × 10 = **$100/شهر**) أنت في الربح! 🎯

---

*تحتاج مساعدة؟ افتح Issue على GitHub أو تواصل مع الدعم.*
