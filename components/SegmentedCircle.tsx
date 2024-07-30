interface SegmentedCircleProps {
    labels: string[];
    colors: string[];
}

export default function SegmentedCircle({labels, colors}: SegmentedCircleProps) {
    const radius = 100;
    const anglePerSegment = 360 / labels.length;
    const rotationOffset = anglePerSegment / 2; // Rotate the entire circle by half the angle of each segment

    const createSegmentPath = (startAngle: number, endAngle: number): string => {
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        const start = polarToCartesian(radius, startAngle);
        const end = polarToCartesian(radius, endAngle);
        return `M0,0 L${start.x},${start.y} A${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y} Z`;
    };

    const polarToCartesian = (radius: number, angleInDegrees: number): { x: number; y: number } => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: radius * Math.cos(angleInRadians), y: radius * Math.sin(angleInRadians),
        };
    };

    const renderSegments = () => {
        return labels.map((_, index) => {
            const startAngle = -rotationOffset - index * anglePerSegment;
            const endAngle = startAngle + anglePerSegment;
            const color = colors[index % colors.length]; // Use modulo to cycle through colors
            return (<path
                key={`segment-${index}`}
                d={createSegmentPath(startAngle, endAngle)}
                fill={color}
            />);
        });
    };

    const renderLabels = () => {
        return labels.map((label, index) => {
            const angle = -rotationOffset - index * anglePerSegment + anglePerSegment / 2;
            const {x, y} = polarToCartesian(radius * 0.65, angle);
            return (<text
                key={`label-${index}`}
                x={x}
                y={y}
                transform={`rotate(${angle + 90} ${x} ${y})`}
                fill='white'
                fontSize='12'
                fontWeight='bold'
                textAnchor='middle'
                alignmentBaseline='central'
            >
                {label}
            </text>);
        });
    };

    return (<svg xmlns='http://www.w3.org/2000/svg' viewBox='-105 -105 210 210'>
        <defs>
            <clipPath id='sector'>
                <path d='M0,0 L100,0 A100,100 0 0,1 100,100 Z'/>
            </clipPath>
        </defs>
        <g stroke='none'>
            {renderSegments()}
        </g>
        {renderLabels()}
    </svg>);
};