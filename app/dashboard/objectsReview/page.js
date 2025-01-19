import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import './page.css';

function ObjectsReviewPage() {
    const objects = [
        { id: 1, name: "Object 1", workers: ["Alice", "Bob"] },
        { id: 2, name: "Object 2", workers: null }, // Некоректний тип, буде замінено на []
        { id: 3, name: "Object 3" }, // Відсутнє поле workers
    ];

    const processedObjects = objects.map((obj) => ({
        ...obj,
        workers: Array.isArray(obj.workers) ? obj.workers : [],
    }));

    return (
        <div>
            <h1>Objects Review</h1>
            <div className="grid-container py-2 m-2">
            <Button>
                <a href="/dashboard/addObject">Добавити об'єкт</a>
            </Button>
            <Button>
                <a href="/dashboard/students">Добавити робітника</a>
            </Button>
            </div>
            <div className="grid-container">
                {processedObjects.map((object) => (
                    <div key={object.id} className="card">
                        <h2>{object.name}</h2>
                        <p>Workers:</p>
                        <ul>
                            {object.workers.length > 0 ? (
                                object.workers.map((worker, index) => (
                                    <li key={index}>{worker}</li>
                                ))
                            ) : (
                                <p>No workers assigned.</p>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ObjectsReviewPage;