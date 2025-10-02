import React from 'react'

const WhatsAppButton = () => {
    const phoneNumber = "971588382030";
    const message = "Hello Eternica Beauty, I am interested in your products and services. Can you provide more details?"; // Optional default message

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                zIndex: 9999,
            }}
        >
           <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 32 32"
                width="30"
                height="30"
            >
                <path d="M16.001 3.2c-7.059 0-12.8 5.741-12.8 12.8 0 2.259.592 4.459 1.728 6.403l-1.84 6.741 6.88-1.801a12.74 12.74 0 0 0 6.032 1.557h.001c7.059 0 12.8-5.741 12.8-12.8s-5.741-12.8-12.8-12.8zm0 23.47a10.63 10.63 0 0 1-5.414-1.484l-.387-.23-4.084 1.07 1.092-3.998-.252-.41a10.56 10.56 0 0 1-1.63-5.712c0-5.893 4.796-10.69 10.689-10.69 2.856 0 5.539 1.112 7.556 3.13a10.63 10.63 0 0 1 3.134 7.559c-.001 5.893-4.797 10.69-10.691 10.69zm5.864-7.998c-.321-.161-1.902-.94-2.198-1.046-.295-.108-.511-.162-.729.161-.216.322-.837 1.046-1.027 1.262-.19.215-.379.243-.7.081-.322-.161-1.359-.5-2.588-1.595-.956-.854-1.602-1.909-1.791-2.231-.19-.323-.02-.497.142-.658.146-.145.322-.379.483-.568.162-.19.215-.323.322-.538.108-.216.054-.405-.027-.567-.081-.162-.729-1.756-1-2.405-.264-.634-.533-.548-.729-.558l-.623-.01c-.216 0-.568.081-.865.405-.296.322-1.131 1.106-1.131 2.698 0 1.592 1.157 3.13 1.318 3.347.162.215 2.28 3.478 5.531 4.878.773.334 1.375.534 1.845.682.774.246 1.478.211 2.034.128.62-.093 1.902-.777 2.171-1.527.27-.75.27-1.392.189-1.527-.081-.135-.296-.216-.617-.377z" />
            </svg>
        </a>
    )
}

export default WhatsAppButton