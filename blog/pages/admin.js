import React, { useState, useEffect } from 'react'

import { getUnpublishedComments } from '@/services'
const admin = () => {
    const [unpublishedComments, setUnpublishedComments] = useState([])

    useEffect(() => {
        getUnpublishedComments()
            .then((result) => setUnpublishedComments(result))
    }, [])
    return (
        <div>
            <h1>Admin Page</h1>
            {/* Add your admin interface components and logic here */}
            {unpublishedComments.map((comment) => (
                <h1>{comment.comment}</h1>
            ))}
        </div>
  )
}

export default admin