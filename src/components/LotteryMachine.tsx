'use client';
import React, { useEffect, useRef, useImperativeHandle, useState } from 'react';
import Matter from 'matter-js';
import { Howl } from 'howler';

const GlassSphereCage = React.forwardRef((props: any, ref: any) => {
  const refScreen = useRef(null);
  let numberBalls = props?.config?.numberBalls || 10;
  const [realEngine, setrealEngine] = useState<any>(null);

  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Events = Matter.Events,
    World = Matter.World;

  const renderOptions = {
    width: 240,
    height: 240,
  };

  const collisionSound = new Howl({
    src: ['/sound-cage.m4a'],
  });

  const stockInHoleSOund = new Howl({
    src: ['/ball-stuck-in-hole.m4a'],
  });

  const initialRotationForce = 0.0002;

  // Hàm để áp dụng lực quay
  function applyRotation() {
    const rotationForce = initialRotationForce;
    Composite.allBodies(realEngine.world).forEach((body) => {
      if (!body.isStatic) {
        Body.applyForce(
          body,
          {
            x: body.position.x,
            y: body.position.y,
          },
          {
            x: -rotationForce * (body.position.y - renderOptions.height / 2),
            y: rotationForce * (body.position.x - renderOptions.width / 2),
          }
        );
      }
    });
  }

  function removeBall(index: number) {
    const allBodies = Composite.allBodies(realEngine.world);
    const nonStaticBodies = allBodies.filter((body) => !body.isStatic);

    if (nonStaticBodies.length > 0) {
      const randomIndex = index > -1 ? index : Math.floor(Math.random() * nonStaticBodies.length);
      const bodyToRemove = nonStaticBodies[randomIndex];
      // Loại bỏ quả bóng khỏi thế giới vật lý
      // World.remove(realEngine.world, bodyToRemove);
      props.onEnd(randomIndex);
    }
  }

  const startRolling = (duration: number) => {
    var rotationIntervalRef = setInterval(() => applyRotation(), 15);
    collisionSound.play();
    setTimeout(() => {
      clearInterval(rotationIntervalRef);
      collisionSound.stop();
      stockInHoleSOund.play();
      removeBall(props.config.targetIndex);
    }, duration);
  };

  useImperativeHandle(ref, () => ({
    start() {
      console.log(Composite.allBodies(realEngine.world));
      startRolling(10000);
    },
  }));

  // Render the world on mount
  useEffect(() => {
    if (!refScreen.current) return;
    const engine: any = Engine.create();
    const runner = Runner.create();
    setrealEngine(engine);

    const render: any = Render.create({
      element: refScreen.current,
      engine: engine,
      options: {
        width: 280,
        height: 280,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Creating a static glass sphere cage

    const circleRadius = 120;
    const centerX = renderOptions?.width / 2;
    const centerY = renderOptions?.height / 2;

    const parts = [];

    const partSize = 1; // Kích thước cơ bản của các phần
    const bumpSize = 1; // Kích thước lớn hơn cho các phần gồ ghề

    for (let i = 0, angle = 0; angle < 360; i++, angle += 1) {
      const x = centerX + circleRadius * Math.cos((angle * Math.PI) / 180);
      const y = centerY + circleRadius * Math.sin((angle * Math.PI) / 180);

      const size = i % 2 === 0 ? bumpSize : partSize; // Đổi kích thước cho mỗi phần thứ hai
      const part = Bodies.rectangle(x, y, size, size, {
        isStatic: true,
        render: { visible: true },
      });

      Body.rotate(part, (angle * Math.PI) / 180); // Xoay mỗi phần để hướng ra ngoài từ tâm
      Composite.add(engine.world, part);
      parts.push(part);
    }

    for (var i = 0, len = numberBalls; i < len; i++) {
      // Randomize position inside the sphere
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = Math.random() * circleRadius * 0.7; // Random radius within the sphere
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const visualBody = Bodies.circle(x, y, 19.5, {
        restitution: 0.5,
        friction: 0,
        mass: 12,
        render: {
          strokeStyle: '#ffffff',
          sprite: {
            texture: '/balls/58.png',
            xScale: 0.11,
            yScale: 0.11,
          },
        },
      });

      Composite.add(engine.world, [visualBody]);
    }

    // Hàm áp dụng lực ngẫu nhiên khi có va chạm
    Events.on(engine, 'collisionStart', function (event: any) {
      event.pairs.forEach(function (pair: any) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        const forceMagnitude = 0.02 * bodyB.mass;

        Body.applyForce(bodyA, bodyA.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: (Math.random() - 0.5) * forceMagnitude,
        });

        Body.applyForce(bodyB, bodyB.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: (Math.random() - 0.5) * forceMagnitude,
        });
      });
    });

    Render.run(render);
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={refScreen}
      style={{
        width: '240px',
        height: '240px',
        borderRadius: '100%', // Tạo hình tròn
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    />
  );
});

GlassSphereCage.displayName = 'GlassSphereCage';
export default GlassSphereCage;
