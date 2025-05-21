import { MintContract } from '@/config'
import { useOneToken } from '@/hooks/useOneToken'
import ModelViewer from './ModelViewer'; 
import React from 'react'

export default function NFT({userId,tokenId}) {
  const {token,metadata,sale} = useOneToken(tokenId)
  if (!token || !metadata) {
    return <div>Loading...</div>;
  }
  const media = metadata.media;
  const is3DModel = media && media.endsWith('.glb');
  return (
       <>
       <div className="bg-gray-900 w-full top-0  text-white p-3">
          <div className="container ">
                  <div className="flex space-x-4">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                      Transfer
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                      Sell
                    </button>
                  </div>
          </div>
      </div>
      <div className='flex flex-row gap-12 w-5/6 h-full '>
          <div className="container w-3/4 p-6 bg-gray-900 text-white">
            <div className="flex flex-col">
              {/* Left section for the image and details */}
                  <div className="mb-6">
                    <div className="flex justify-center items-center">
                      {metadata.media && (
                        is3DModel ? (
                            <div 
                            style={{ width: '100%', height: '500px' }}>
                              <ModelViewer modelUrl={media} />
                            </div>
                          ) : (
                            <img
                              src={media}
                              alt={metadata.title}
                              className="w-full h-auto object-cover rounded-lg"
                              style={{ maxWidth: '500px', maxHeight: '500px' }} 
                            />
                          )
                      )}
                    </div>
                  </div>
                  {/* Contract and Owner details */}
                    <h1 className="text-2xl font-bold mb-4">{metadata.title}</h1>
                    <div className='flex flex-row gap-5'>
                      <div className="p-4 bg-gray-800 rounded-lg shadow-lg mb-4 flex flex-col">
                        <span className="font-semibold">Contract: </span>
                        <span>{MintContract}</span>
                      </div>
                      <div className="p-4 bg-gray-800 rounded-lg shadow-lg mb-4 flex flex-col">
                        <span className="font-semibold">Owner: </span>
                        <span>{token.owner_id}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold">Token ID: </span>
                      <span>{tokenId}</span>
                    </div>
              
                      <h4 className="font-bold mb-4">{metadata.description}</h4>
                    
            </div>
        </div>
        {/* Right section for the sale status */}
          <div className="h-full w-1/4 sticky top-0">
                <div className="p-4 bg-gray-900 rounded-lg shadow-lg mb-4">
                  <h2 className="text-xl font-bold mb-4">Sale Status</h2>
                  <div className="mb-4">
                    <span className="font-semibold">{sale ? 'Listed' : 'Not Listed'}</span>
                  </div>
                </div>
          </div>
      </div>
      </>

    
  )
}
