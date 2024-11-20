import React, { useState, useEffect, useRef } from 'react';
import { FaFolderPlus, FaSignOutAlt, FaCog, FaPlus, FaHome } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'; // 引入库


// 设置应用的根元素
Modal.setAppElement('#root');

const dummyData = [
    'ceremony.jpg',
    'angela1.jpg',
    // 添加其他图片名称，确保总数为20
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg',
    'ceremony.jpg',
    'angela1.jpg'
];

const Album: React.FC = () => {
    const [photos, setPhotos] = useState(dummyData.slice(0, 12)); // 初始显示12张
    const [currentIndex, setCurrentIndex] = useState(12); // 当前显示的照片索引
    const [allLoaded, setAllLoaded] = useState(false); // 是否已加载所有照片
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const photoContainerRef = useRef<HTMLDivElement>(null);
    //useRef是React提供的一个钩子，用于创建一个引用，这个引用可以指向一个DOM元素
    //useRef的返回值是一个对象，这个对象有一个current属性，这个属性就是指向的DOM元素
    //useRef的返回值在组件的整个生命周期中都不会改变，所以它非常适合用来存储一些不需要随着组件状态改变而改变的值
    //HTMLDivElement是DOM元素的类型，表示一个HTML的div元素.useRef<HTMLDivElement>(null)表示创建一个指向HTMLDivElement类型的DOM元素的引用，初始值为null
    const [photoContainerWidth, setPhotoContainerWidth] = useState(0);


    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            //innerHeight是浏览器窗口的高度，scrollY是浏览器窗口的滚动距离，document.documentElement.scrollHeight是整个文档的高度
            //如果浏览器窗口的高度加上滚动距离大于等于整个文档的高度减去100，那么就说明已经到达了页面的底部
            //这些属性都是DOM元素的属性，可以通过window对象访问
            setPhotos((prevPhotos) => {
                const nextIndex = Math.min(currentIndex + 12, dummyData.length);
                //这段代码的意思是，如果当前照片索引加上12后，超过了dummyData的总长度，那么就设置为dummyData的总长度，否则就设置为currentIndex + 12
                setCurrentIndex(nextIndex);
                if (nextIndex >= dummyData.length) {
                    setAllLoaded(true); // 所有照片已加载完毕
                }
                return [...prevPhotos, ...dummyData.slice(currentIndex, nextIndex)]; // 将当前照片索引到nextIndex之间的照片添加到photos数组中
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentIndex]);

    useEffect(() => {
        const updateWidth = () => {
            if (photoContainerRef.current) {
                setPhotoContainerWidth(photoContainerRef.current.offsetWidth - 20);
            }
        };

        window.addEventListener('resize', updateWidth);

        // 初始化宽度
        updateWidth();

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    // 如果需要保留方向键导航功能
    useEffect(() => {
        if (isModalOpen) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
                        showPreviousPhoto();
                    }
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
                        showNextPhoto();
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isModalOpen, selectedPhotoIndex]);


    const openModal = (index: number) => {
        console.log("openModal", index);
        setSelectedPhotoIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhotoIndex(null);
    };

    const showNextPhoto = () => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
            setSelectedPhotoIndex(selectedPhotoIndex + 1);
        }
    };

    const showPreviousPhoto = () => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
            setSelectedPhotoIndex(selectedPhotoIndex - 1);
        }
    };

    return (
        <div className="flex">
            {/* 侧边栏 */}
            <div className="w-[240px] bg-sidebar p-4 flex flex-col justify-between h-screen sticky top-0 font-title">
                <div className="flex flex-col items-center">
                    <img src="avatar.jpg" alt="Profile" className="rounded-full mt-10 w-32 h-32 mb-4" />
                    <h2 className="text-2xl mb-10">RainMan96</h2>
                    <div className="text-lg w-full">
                        <button className="flex items-center mb-2 w-full text-left hover:bg-amber-500 rounded-full p-2 transition-colors duration-300">
                            <FaFolderPlus className="mr-2" /> Create new folder
                        </button>
                    </div>
                </div>
                <div className="text-lg w-full mt-auto ">
                    <button className="flex items-center w-full text-left hover:bg-amber-500 rounded-full p-2 transition-colors duration-300"
                        onClick={() => navigate('/')}>
                        <FaHome className="mr-2" /> Home
                    </button>
                    <button className="flex items-center w-full text-left hover:bg-amber-500 rounded-full p-2 transition-colors duration-300">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                    <button className="flex items-center w-full text-left hover:bg-amber-500 rounded-full p-2 transition-colors duration-300">
                        <FaCog className="mr-2" /> Settings
                    </button>
                </div>
            </div>

            {/* 照片查看界面 */}
            <div className="flex-1 pb-4">
                <div className="flex sticky top-0 p-2 gap-2 bg-gray-700">
                    {/* 搜索栏 */}
                    <div className="flex ">
                        <button className="text-white text-3xl"><IoIosSearch /></button>
                    </div>
                    {/*上传照片*/}
                    <div className="flex">
                        <button className="text-white text-3xl"><FaPlus /></button>
                    </div>
                </div>

                {/* 照片展示区域，居中显示照片 */}
                <div
                    ref={photoContainerRef}
                    className="grid grid-cols-4 p-4 gap-4 justify-center"
                >
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            src={`/${photo}`}
                            alt={`Photo ${index}`}
                            className="flex w-full h-auto cursor-pointer"
                            onClick={() => openModal(index)}
                        />
                    ))}
                </div>
                <p className="text-center mt-4">
                    {allLoaded ? "That's all of the photos." : "Scroll down for more..."}
                </p>

                {/* 模态框 */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Photo Modal"
                    className="modal-content relative mx-auto my-auto outline-none"
                    overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    shouldCloseOnOverlayClick={true}
                >
                    {selectedPhotoIndex !== null && (
                        <div
                            className="relative p-2"
                            style={{
                                maxWidth: photoContainerWidth,
                                maxHeight: '90vh',
                                margin: '10px',
                            }}
                        >
                            {/* 图片展示 */}
                            <TransformWrapper
                                initialScale={1}
                                minScale={0.5}
                                maxScale={5}
                                wheel={{ step: 0.1 }}
                            >
                                <TransformComponent>
                                    <img
                                        src={`/${photos[selectedPhotoIndex]}`}
                                        alt={`Photo ${selectedPhotoIndex}`}
                                        className="w-full h-auto shadow-photo"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: 'calc(90vh - 50px)',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </TransformComponent>
                            </TransformWrapper>



                            {/* 左右箭头按钮 */}
                            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                                <button
                                    onClick={showPreviousPhoto}
                                    disabled={selectedPhotoIndex === 0}
                                    className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 bg-opacity-70 hover:bg-gray-900 shadow-md text-white text-xl transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    onClick={showNextPhoto}
                                    disabled={selectedPhotoIndex === photos.length - 1}
                                    className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 bg-opacity-70 hover:bg-gray-900 shadow-md text-white text-xl transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>

                            {/* 关闭按钮 */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 hover:bg-red-700 shadow-md text-white text-l transition-transform transform hover:scale-110"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </Modal>


            </div>
        </div>
    );
};

export default Album; 