CREATE OR REPLACE VIEW post_with_labels AS (
	SELECT 
		p.id,
		p.slug,
		p.title,
		p.introduction,
		p.content,
		p.author,
		TO_CHAR(p.create_time, 'YYYY-MM-DD HH24:MI:SS') AS create_time,
		TO_CHAR(p.last_edited_time, 'YYYY-MM-DD HH24:MI:SS') AS last_edited_time,
		p.word_count,
		p.reading_time,
		p.image_url,
		p.category_id,
		p.state,
		p.is_featured,
		ARRAY_AGG(pl.label_id) FILTER (WHERE pl.label_id IS NOT NULL) AS labels
	FROM posts p
	LEFT JOIN post_labels pl ON p.id = pl.post_id
	GROUP BY
		p.id,
		p.title,
		p.introduction,
		p.content,
		p.author,
		p.create_time,
		p.last_edited_time,
		p.word_count,
		p.reading_time,
		p.image_url,
		p.category_id,
		p.state,
		p.is_featured
	ORDER BY p.create_time DESC
)