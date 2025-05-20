
import { useState, useEffect } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    fetch("/arabic_reviews_740.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.name.includes(search)
  );

  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem', fontFamily: 'sans-serif', direction: 'rtl', textAlign: 'right' }}>
      <h1>التقييمات | شامل للحلول والخدمات</h1>
      <p style={{ color: 'goldenrod' }}>★★★★★ 4.9 من 5 بناءً على 740 تقييم</p>
      <input
        type="text"
        placeholder="ابحث باسم المستخدم..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={() => alert('شكراً! سيتم تحويلك لإضافة تقييمك قريباً')}>
        + أضف تقييمك
      </button>
      {currentReviews.map((review, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <strong>{review.name}</strong> - <small>{review.date}</small>
          <div style={{ color: 'gold' }}>{"★".repeat(review.rating)}</div>
          <p>{review.comment}</p>
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            style={{
              margin: '0 5px',
              padding: '0.5rem',
              background: currentPage === idx + 1 ? '#000' : '#fff',
              color: currentPage === idx + 1 ? '#fff' : '#000'
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
