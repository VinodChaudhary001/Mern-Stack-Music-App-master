import React from 'react';

function MediaItem({ data, showImage,img }) {
  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
        {showImage && (
          <div className="relative rounded-md overflow-hidden" style={{ width: '64px', height: '64px' }}>
            {img && (
              <img
                src={`http://localhost:4000/${img}`}
                alt="library songs"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>

        )}
      
      </div>
     
    </div>
  );
}

export default MediaItem;
