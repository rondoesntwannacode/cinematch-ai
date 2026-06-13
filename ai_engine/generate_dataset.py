import requests
import pandas as pd
import time

API_KEY = "9aa9fc11780b49d18a3cfe0b04d9ee19"

# Genre Mapping
genre_map = {

    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller",
    10752: "War"

}

movies_data = []

# Multiple TMDB Categories
categories = [

    "popular",
    "top_rated",
    "now_playing",
    "upcoming"

]

print("Fetching large movie dataset from TMDB...")

# Loop through categories
for category in categories:

    print(f"\nCATEGORY: {category}")

    # 125 pages each
    # 125 x 20 movies ≈ 2500 per category
    for page in range(1, 126):

        print(f"Page {page}")

        url = (
            f"https://api.themoviedb.org/3/movie/{category}"
            f"?api_key={API_KEY}&page={page}"
        )

        try:

            response = requests.get(
                url,
                timeout=20
            )

            # Failed request
            if response.status_code != 200:

                print(
                    f"ERROR {response.status_code}"
                )

                continue

            data = response.json()

            # Safety check
            if "results" not in data:

                continue

            for movie in data["results"]:

                title = movie.get(
                    "title", ""
                )

                overview = movie.get(
                    "overview", ""
                )

                rating = movie.get(
                    "vote_average", 0
                )

                popularity = movie.get(
                    "popularity", 0
                )

                genre_ids = movie.get(
                    "genre_ids", []
                )

                # Skip incomplete movies
                if (
                    not title
                    or not overview
                ):

                    continue

                # Convert genre ids → names
                genres = []

                for genre_id in genre_ids:

                    if genre_id in genre_map:

                        genres.append(
                            genre_map[genre_id]
                        )

                genre_text = " ".join(genres)

                # Combine all AI tags
                tags = (
                    title + " "
                    + genre_text + " "
                    + overview
                )

                movies_data.append({

                    "title": title,

                    "overview": overview,

                    "genres": genre_text,

                    "rating": rating,

                    "popularity": popularity,

                    "tags": tags

                })

            # Avoid API rate limits
            time.sleep(0.25)

        except Exception as error:

            print("REQUEST FAILED:")
            print(error)

# Convert to DataFrame
df = pd.DataFrame(movies_data)

print("\nInitial Movie Count:")
print(len(df))

# Remove duplicates
df.drop_duplicates(
    subset=["title"],
    inplace=True
)

# Remove empty overviews
df = df[
    df["overview"].str.strip() != ""
]

# Remove very short overviews
df = df[
    df["overview"].str.len() > 30
]

# Remove missing genres
df = df[
    df["genres"].str.strip() != ""
]

# Sort by popularity
df = df.sort_values(
    by="popularity",
    ascending=False
)

# Reset index
df.reset_index(
    drop=True,
    inplace=True
)

# Save dataset
df.to_csv(

    "movies.csv",

    index=False,

    encoding="utf-8"

)

print("\nmovies.csv generated successfully!")

print(f"Final Clean Movies: {len(df)}")

print("\nDataset Columns:")

print(df.columns)