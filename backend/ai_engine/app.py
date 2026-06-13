from flask import Flask, jsonify
from flask_cors import CORS

import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load dataset
movies = pd.read_csv("movies.csv")

# Fill empty values
movies["overview"] = movies["overview"].fillna("")

# Convert text to vectors
tfidf = TfidfVectorizer(
    stop_words="english"
)

tfidf_matrix = tfidf.fit_transform(
    movies["overview"]
)

# Similarity matrix
cosine_sim = cosine_similarity(
    tfidf_matrix,
    tfidf_matrix
)

# Home route
@app.route("/")

def home():

    return jsonify({
        "message": "AI Engine Running"
    })

# Recommendation route
@app.route("/recommend/<title>")

def recommend(title):

    title = title.lower().strip()

    # Find movie
    movie_index = None

    for index, row in movies.iterrows():

        if row["title"].lower().strip() == title:

            movie_index = index
            break

    # If movie not found
    if movie_index is None:

        return jsonify([
            "Movie not found"
        ])

    # Similarity scores
    scores = list(
        enumerate(cosine_sim[movie_index])
    )

    # Sort
    scores = sorted(
        scores,
        key=lambda x: x[1],
        reverse=True
    )

    # Top recommendations
    recommendations = []

    for movie in scores[1:6]:

        movie_idx = movie[0]

        recommendations.append(
            movies.iloc[movie_idx]["title"]
        )

    return jsonify(recommendations)

# Run app
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )