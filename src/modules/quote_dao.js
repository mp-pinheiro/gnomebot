import CryptoJS from "crypto-js"
import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore();


export default class QuoteModule {
    static QUOTES_PER_LISTING = 5

    static async updateStats(decrease = false) {
        const statsRef = db.collection('quotes').doc('stats');

        await db.runTransaction(async (t) => {
            const doc = await t.get(statsRef);
            const numberOfQuotes = decrease ? doc.data().number_of_quotes - 1 : doc.data().number_of_quotes + 1;
            t.update(statsRef, { number_of_quotes: numberOfQuotes });
        });
    }

    static async getQuoteStats() {
        const statsRef = await db.collection('quotes').doc('stats').get();

        return statsRef.data();
    }

    static async addQuote(author, content) {
        const d = new Date()
        let quote = {
            'author': author.username,
            'quote': content,
            'date': d.toLocaleDateString('pt-br', { dateStle: 'short' }),
            'timestamp': Math.floor(d.getTime())
        };

        // inserts using md5 of quote as id to avoid duplications
        const id = CryptoJS.MD5(content).toString();
        const quoteRef = db.collection('quotes').doc(id);
        const doc = await quoteRef.get();

        // only set if new quote and update stats
        if (!doc.exists) {
            quoteRef.set(quote);
            await this.updateStats()
        }
    }

    static async getQuote(index, getRef = false) {
        const querySnapshot = await db
            .collection('quotes')
            .orderBy('timestamp')
            .get();

        let ret = null;
        let i = 1;
        querySnapshot.forEach(function (doc) {
            if (i === index) {
                if (getRef) {
                    ret = doc.ref;
                } else {
                    ret = doc.data();
                }
            }
            i++;
        });

        return ret;
    }

    static async getQuotes(startIndex) {
        const quotes = []

        const querySnapshot = await db
            .collection('quotes')
            .orderBy('timestamp')
            .get();

        let i = 1;
        querySnapshot.forEach(function (doc) {
            if (i >= startIndex && i < QuoteModule.QUOTES_PER_LISTING) {
                let quote = doc.data()
                quote['index'] = i // virtual id for removing quotes
                quotes.push(quote)
            }
            i++;
        });

        return quotes
    }

    static async getRandomQuote() {
        let stats = await this.getQuoteStats();
        let numberOfQuotes = stats.number_of_quotes;

        let index = Math.floor(Math.random() * (numberOfQuotes)) + 1;
        let quote = await this.getQuote(index);

        return quote;
    }

    static async removeQuote(index) {
        let ref = await this.getQuote(index, true);

        if (ref !== null) {
            ref.delete();
            await QuoteModule.updateStats(true);

            return true;
        }

        return false;
    }

    static stats() {
        console.log(`Displaying stats.`)
    }

    static displayRandomQyote() {
        console.log(`Displaying random quote.`)
    }
}