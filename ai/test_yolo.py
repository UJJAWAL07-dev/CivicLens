# from ultralytics import YOLO

# model = YOLO("models/yolo26n.pt")

# results = model.predict(
#     source="datasets/test/test.jpg",
#     conf=0.5
# )

# for result in results:
#     print(result.boxes)


from ultralytics import YOLO

model = YOLO("models/yolo26n.pt")

results = model.predict(
    source="datasets/test/issue/pothole_01.jpg",
    conf=0.5,
)

for result in results:
    print(result.boxes)

    result.save(
        filename="outputs/pothole_01_result.jpg"
    )