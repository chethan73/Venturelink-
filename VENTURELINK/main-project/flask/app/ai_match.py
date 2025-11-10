# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.feature_extraction.text import TfidfVectorizer

# def get_match_score(description_1, description_2):
#     """
#     Calculate similarity score between two descriptions using TF-IDF and Cosine Similarity
#     """
#     vectorizer = TfidfVectorizer(stop_words='english')
#     tfidf_matrix = vectorizer.fit_transform([description_1, description_2])
#     similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
#     return similarity[0][0]
