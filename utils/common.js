export const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export const getRoomId = (userId1, userId2) =>{
    const sortedIds = [userId1, userId2].sort()
    const roomId = sortedIds.join('-');
    return roomId;
}

export const formatFirestoreTimestamp = (timestampObj) => {
  const now = new Date();
  const timestamp = new Date(timestampObj.seconds * 1000 + timestampObj.nanoseconds / 1000000);
  
  const diffDays = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));
  
  const timeStr = timestamp.toLocaleTimeString('sr-RS', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  if (diffDays === 0) {
    return timeStr;
  } else if (diffDays === 1) {
    return `juče u ${timeStr}`;
  } else if (diffDays < 7) {
    const dayName = timestamp.toLocaleDateString('sr-RS', { weekday: 'long' });
    return `${dayName} u ${timeStr}`;
  } else {
    return timestamp.toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit'
    });
  }
}