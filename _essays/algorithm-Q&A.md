---
layout: essay_single
title: algorithm Q&A
date: 2024-01-10
tags:
  - algorithm
categories:
- Notes
- algorithm
feature_text: |
  ## algorithm Q&A
  Post by ailswan Jan. 10, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---
 
## Problem 1: Differentiating L1 and L2 Norms

Given a vector `x`, the L1 norm (denoted as `||x||_1`) is defined as the sum of the absolute values of its elements. It is also referred to as the "Sparse Rule Operator" or "Lasso Regularization." For example, if `A = [1, -1, 3]`, then the L1 norm of `A` is calculated as `|1| + |-1| + |3|`.

In summary:

- **L1 Norm (`||x||_1`):** The sum of the absolute values of the elements of vector `x`.
- **L2 Norm (`||x||_2`):** The square root of the sum of the squared elements of vector `x`, also known as Euclidean norm or Frobenius norm.
- **Lp Norm (`||x||_p`):** The p-th root of the sum of the absolute values raised to the power of `p` for each element in vector `x`.

In the context of support vector machine (SVM) learning, L1 norm regularization is a process of optimizing the cost function. Incorporating L1 norm into the cost function promotes sparsity in the learned results, facilitating feature extraction.

- L1 norm induces sparsity in weight values, aiding in feature extraction.
- L2 norm helps prevent overfitting and enhances the model's generalization capability.

---

## Problem 2: Causes of Overfitting

**1. Small Dataset:**
   - Overfitting is prone to occur when the dataset is too small. If a small subset of data perfectly fits a certain pattern (e.g., a 3rd-degree function), a machine learning or deep learning model might generalize it as a simpler model (e.g., a linear function). Applying this model to a test set would result in poor performance.

**2. Inconsistent Training and Validation Set Distributions:**
   - Overfitting can arise if the training set is not representative of the distribution of the validation set. A model trained on data with a particular distribution may perform poorly on data with a different distribution.

**3. Excessive Model Complexity:**
   - Choosing a highly complex model for a task with a simple underlying pattern may lead to overfitting. The complexity of the model should match the complexity of the data.

**4. Poor Data Quality:**
   - Low-quality data with noise can mislead the model during the learning process. Learning noise as a pattern diminishes the generalization capability of the model, resulting in poor predictions.

**5. Overtraining:**
   - Overtraining occurs when a model is trained for an extended period, leading it to learn noise and specific patterns present in the training data. This negatively impacts the model's performance on new data.

---

## Problem 3: Solutions to Overfitting

- **Early Stopping:**
  - Stop training after multiple iterations if there is no significant improvement in model performance.

- **Data Augmentation:**
  - Increase the size of the dataset by introducing variations, adding random noise, or resampling.

- **Regularization:**
  - Use regularization techniques to constrain the complexity of the model.

- **Cross-Validation:**
  - Divide the dataset into multiple folds for training and validation to assess model performance across different subsets.

- **Feature Selection/Dimensionality Reduction:**
  - Reduce the number of features to prevent overfitting.

- **Validation Set Creation:**
  - Create a separate validation set to evaluate the model's performance, distinct from the training set.

---

## Problem 4: How to Address Overfitting

- **Dropout:**
  - Introduce dropout layers during training to randomly deactivate neurons, preventing overreliance on specific neurons.

- **Regularization:**
  - Apply regularization techniques to penalize large weights or complex model structures.

- **Batch Normalization:**
  - Normalize activations within a layer to stabilize and accelerate the training process.

---

## Problem 5: Binary Search Basic Principles

The concept of "Binary Search" is commonly encountered in our daily lives and work. It continuously narrows down the search range until the target element is found or determined to be absent. The process of "continuously narrowing down the search range" follows the principle of "Divide and Conquer," also known as the reduction-to-solution approach.

Introduction to the "Divide and Conquer" Principle:
Here, "Divide" means reducing the size of the problem, and "Conquer" means solving it. The "Divide and Conquer" approach is essentially an "exclusion method." In each round, a certain range, where the target element definitely does not exist, is excluded. The search continues within the remaining potentially valid range.

This approach gradually reduces the size of the problem with each judgment and operation. Since the size of the problem is finite, it can be solved through a finite number of operations.

While some may have heard of the "Divide and Conquer" principle, the difference between "Divide and Conquer" and "Reduction-to-Solution" lies in the fact that, after splitting a problem into several sub-problems, the problem solved using "Reduction-to-Solution" is found within only one of these sub-problems.

---

## Problem 6: Resolving the Cold Start Problem in Recommendation Systems

- **Provide Non-personalized Recommendations:**
  - For example, recommending popular rankings allows users to explore popular items. Later, when user data is collected, it can switch to personalized recommendations.

- **Utilize User Registration Information:**
  - Users provide information such as age, gender, occupation, ethnicity, education, and location during registration for coarse-grained personalization. Some websites also let users describe their interests in text.

- **Use Social Network Information:**
  - Encourage users to log in via social network accounts (with user authorization), import friend information, and then recommend items liked by their friends.

---

## Problem 7: Decision Tree Algorithms

Decision tree algorithms include:

- **ID3:** The core of ID3 algorithm is to apply the information gain criterion at each node of the decision tree to choose features, recursively building the decision tree.

- **C4.5:** The core of C4.5 algorithm is to use the information gain ratio to choose features during the generation process.

- **CART (Classification and Regression Trees):** The core of CART algorithm is to use the Gini index to choose features during the generation process.

Other algorithms based on decision trees include Random Forest, Gradient Boosted Decision Trees (GBDT), XGBoost, and more.

---

## Problem 8: Difference Between Recall and Ranking

- **Recall's Purpose:**
  - The goal of recall is to reduce the number of candidates (ideally within 1000) for efficient subsequent precise ranking using complex models.

- **Speed in Recall:**
  - Since the evaluation of a massive number of candidates needs to be done quickly, the key point for recall is speed. Compared to ranking, recall algorithms have relatively simple models and use fewer features.

- **Complexity in Ranking:**
  - Ranking models are more complex, aiming for accuracy. They use more features to achieve higher precision.

---
## Problem 9: Methods to Alleviate Gradient Vanishing, Exploding, and Diverging

**1. Gradient Vanishing:**
   - According to the chain rule, if the product of the partial derivative of each neuron in each layer with respect to the output of the previous layer and the weight is consistently less than 1, the derivative of the error with respect to the input of the input layer tends to 0 after many layers of propagation.
   - Using ReLU activation function can effectively address the issue of gradient vanishing.

**2. Gradient Diverging:**
   - According to the chain rule, if the product of the partial derivative of each neuron in each layer with respect to the output of the previous layer and the weight is consistently greater than 1, the derivative of the error with respect to the input of the input layer tends to infinity after many layers of propagation.
   - Activation functions can be used to mitigate this issue.

**3. Gradient Exploding:**
   - To address the problem of gradient exploding, the solution is to introduce Gradient Clipping.
   - By applying Gradient Clipping, the gradients are constrained within a specified range, preventing them from becoming too large.

---

## Problem 10: Drawbacks of Batch Normalization

- **Small Batch Sizes Result in Large Fluctuations:**
  - Small batch sizes can lead to significant fluctuations.
  
- **Issues with Text Data and Variable Lengths:**
  - Batch normalization faces challenges when dealing with text data due to varying effective lengths of different sequences.

- **Significant Differences in Mean and Variance on Test Set:**
  - If there are substantial differences in mean and variance between training and test sets, batch normalization may not be suitable.

*Note: LN (Layer Normalization) involves subtracting the mean and dividing by the standard deviation for a sample at a specific time step, followed by parameter learning.*

---

## Problem 11: How to Perform Word Segmentation?

Word segmentation can be done through:

- **Rule-Based Methods (Using Extensive Word Lists):**
  - Based on predefined rules and extensive word lists.

- **Statistical Methods (Co-occurrence Statistics):**
  - Based on statistical measures, such as co-occurrence frequency, where words appearing together more often are likely to form a meaningful segment.

- **Neural Network Approaches (LSTM + CRF for Part-of-Speech Tagging):**
  - Utilizing neural networks, such as Long Short-Term Memory (LSTM) networks combined with Conditional Random Fields (CRF) for part-of-speech tagging, can be effective for word segmentation.

---

## Problem 12: Why Apply 3/4 Power to Frequency in Negative Sampling for Word2Vec?

To ensure that high-frequency words are more likely to be sampled, the 3/4 power is applied to the word frequencies during negative sampling. This way, the probability of low-frequency and rare words being sampled is increased. Without this adjustment, rare words might be sampled too infrequently and fail to update their corresponding embeddings.

---

## Problem 13: Two Optimization Approaches for Word2Vec

1. **Hierarchical Softmax Model:**
   - Construct a Huffman tree based on word frequencies.
   - Apply Huffman coding, assigning 1 for the left subtree and 0 for the right subtree.
   - Use binary logistic regression to learn the model parameters based on the constructed tree.
   - Advantages include reduced computation complexity (log2V) and better handling of high-frequency and low-frequency words.

2. **Negative Sampling Model:**
   - Sample a small set of negative examples.
   - Utilize binary logistic regression to learn the model parameters for both positive and negative examples.
   - Sampling is based on word frequencies, with a 3/4 power applied to the frequencies.
   - Advantages include improved efficiency and handling of rare words.

---
## Problem 14: Principles and Pros/Cons of CNN

CNN (Convolutional Neural Network) is a type of feedforward neural network typically consisting of 5 layers: input layer, convolutional layer, activation layer, pooling layer, and fully connected (FC) layer. The core components are the convolutional layer and the pooling layer.

**Advantages:**

- **Shared Convolutional Kernels:**
  - Efficient handling of high-dimensional data by sharing convolutional kernels.
- **Automated Feature Selection:**
  - No need for manual feature selection.

**Disadvantages:**

- **Requires Tuning:**
  - Hyperparameter tuning is necessary.
- **Large Data Requirement:**
  - Requires a substantial amount of data.

---

## Problem 15: Description and Applications of CRF Model

CRF (Conditional Random Field) is a model that calculates the conditional probability density function of one group of output random variables given another group of input random variables.

The CRF model assumes that the output variables form a Markov Random Field. It is commonly used for sequence labeling tasks and structured prediction problems. The solution involves maximum likelihood estimation or regularized maximum likelihood estimation.

---

## Problem 16: Structure of Transformer

Transformer is a typical encoder-decoder model with both the encoder and decoder consisting of 6 blocks. Each block in the encoder has two modules: multi-head self-attention and a feedforward neural network. Each block in the decoder has three modules: multi-head self-attention, multi-head encoder-decoder attention, and a feedforward neural network. Both encoder and decoder blocks include residual layers and layer normalization.

---

## Problem 17: Differences Between ELMo and BERT

- **BERT:**
  - Utilizes the Transformer architecture's Encoder module.

- **ELMo:**
  - Uses a bi-layer bidirectional LSTM module.

---

## Problem 18: Differences Between ELMo and Word2Vec

ELMo word embeddings contain contextual information and are not fixed. They change dynamically based on the surrounding context.

---

## Problem 19: Differences Between LSTM and GRU

1. **Performance Similarity:**
   - LSTM and GRU perform comparably on many tasks.

2. **Parameter Count:**
   - GRU has fewer parameters, making it easier to converge. However, LSTM performs better on large datasets.

3. **Gating Mechanisms:**
   - GRU has two gates (update and reset), while LSTM has three gates (forget, input, output).
   - GRU directly passes the hidden state to the next unit, while LSTM wraps the hidden state with a memory cell.

---
## Problem 20: Basic Concepts in Image Processing - Histogram Equalization, Wiener Filtering, and Sharpening

**Histogram Equalization:**
Histogram Equalization is a method for enhancing image contrast. It transforms the distribution of pixel intensities in an image to approximately achieve a uniform distribution, thus enhancing the image's contrast.

**Wiener Filtering:**
Wiener filter is a linear filter that minimizes the mean square error between the estimated and true signals. It is an optimal filter under certain constraints. The output is adjusted based on the noise variance and the desired output.

**Sharpening Filter:**
Sharpening filters use local differentials as operators to increase the difference between neighboring pixel values, making transitions in the image more pronounced. The purpose of sharpening is to enhance the edges and contours of an image, often referred to as a high-pass filter.

---

## Problem 21: Batch Normalization (BN) Process and Why Testing and Training Differ

For BN, during training, normalization is performed on each batch of training data using batch-specific mean and variance. During testing, where there is no concept of batches, the mean and variance used are those calculated over the entire training dataset, typically obtained through moving average.

---

## Problem 22: Brief Introduction to the Gradient Boosting Decision Tree (GBDT) Algorithm

GBDT (Gradient Boosting Decision Tree) is a boosting algorithm based on decision trees. It uses decision trees as base learners in an additive model, continuously fitting the residuals of the previous weak learner. It is commonly employed for both classification and regression tasks.

Key Points:
- Utilizes decision trees as base learners.
- Constructs trees to minimize the negative gradient of the loss function.
- Typically employs exponential loss for classification and squared error loss for regression.

---

## Problem 23: Is PCA Supervised or Unsupervised?

PCA (Principal Component Analysis) is an unsupervised learning method. It focuses on transforming the feature space of the dataset without considering any labeled output (y). It is used for dimensionality reduction and capturing the principal components in the data.

---

## Problem 24: Differences Between PyTorch and TensorFlow

1. **Graph Creation:**
   - PyTorch: Uses dynamic computation graphs constructed during runtime.
   - TensorFlow: Utilizes static computation graphs compiled before runtime.

2. **Flexibility:**
   - PyTorch: Dynamic computation graph allows for easy understanding and debugging.
   - TensorFlow: Static computation graph can be less intuitive and challenging for debugging.

3. **Device Management:**
   - PyTorch: Requires explicit device management.
   - TensorFlow: Device management is handled more seamlessly.
  
---

## Problem 25: torch.eval() Function

The `torch.eval()` function in PyTorch is used to set the model to evaluation mode. It affects the behavior of certain layers in the model such as Batch Normalization (BN) and dropout during inference.

### Impact on Batch Normalization (BN):
During training, BN typically uses mini-batches, so the mean and standard deviation are roughly constant within each batch. In the evaluation mode (`torch.eval()`), BN parameters are fixed, utilizing the global mean and standard deviation learned during training.

### Impact on Dropout:
During training, dropout randomly deactivates neurons by multiplying them by a probability (P) before activation. In the evaluation mode, the order is reversed, where neurons are first activated, and then their outputs are multiplied by the dropout probability.

---

## Problem 26: PCA - Principle, Implementation, and Significance

### Principle:
Principal Component Analysis (PCA) is a mathematical technique for dimensionality reduction. It employs orthogonal transformations to convert a set of possibly correlated variables into a set of linearly uncorrelated variables called principal components.

### Implementation:
PCA can be implemented using eigenvalue decomposition of the covariance matrix or singular value decomposition (SVD) of the data matrix.

### Significance:
- Facilitates easier data usage.
- Reduces computational complexity.
- Noise removal.
- Enhances interpretability of results.

---

## Problem 27: Brief Overview of K-means Algorithm

The K-means algorithm is a clustering method that separates a dataset into k clusters by iteratively updating cluster centers based on the mean of points assigned to each cluster.

1. Choose k initial cluster centers (often randomly).
2. Assign each sample to the nearest cluster center based on Euclidean distance.
3. Update cluster centers by computing the mean of points in each cluster.
4. Repeat steps 2-3 until convergence.

K-means simplicity and effectiveness depend on the choice of k and initial cluster points.

---

## Problem 28: Principles of Image Edge Detection

Image edges represent rapid changes in pixel intensities. Edge detection involves identifying these abrupt transitions, typically achieved by applying filters to highlight such changes.

---

## Problem 29: Harris Corners in Image Processing

Harris corners refer to points in an image where there are significant intensity changes in any two mutually perpendicular directions.

### Importance of Using Corners as Feature Points:
- Corners provide distinctive features.
- Efficiently reduce data volume.
- Facilitate reliable image matching.
- Enable real-time processing.

---

## Problem 30: Understanding Receptive Field

Receptive field refers to the region in the input space that a neuron in a particular layer of a neural network is sensitive to. It defines the area from which a neuron gathers information. Understanding the receptive field is crucial in analyzing the network's response to different parts of the input.

---

## Problem 31: Enhancing Image Retrieval Efficiency in Industrial-Scale Tasks

In scenarios involving image retrieval tasks with millions of images, improving efficiency is crucial. One approach involves reducing the dimensionality of the original 2048-dimensional image features to a 128-dimensional binary (0/1) space using hashing index techniques. This process significantly accelerates image comparison.

---

## Problem 32: Examples of Object Detection Methods

1. **Deformable Parts Model**
2. **RCNN (Region-based Convolutional Neural Network)**
3. **Fast-RCNN**
4. **Faster-RCNN**
5. **RFCN (Region-based Fully Convolutional Networks)**
6. **Mask-RCNN**

---

## Problem 33: Three Types of SVM Models and Their Applicability

SVM models come in three types:

1. **Linear Separable Support Vector Machine:**
   - Applicable when training data is linearly separable.

2. **Linear Support Vector Machine:**
   - Suitable for training data that is approximately linearly separable, allowing for some outliers.

3. **Non-linear Support Vector Machine:**
   - Used when training data is not linearly separable, allowing for complex decision boundaries.

---

## Problem 34: Basic Idea of Selection Sort

Selection Sort's fundamental idea is to repeatedly find the minimum (or maximum) element from the unsorted part of the array and place it at the beginning. The process continues by selecting the next smallest (or largest) element from the remaining unsorted part until the entire array is sorted.

---

## Problem 35: Command to View Machine's Memory Usage Information

To check the machine's memory usage information, you can use the following command:

```bash
cat /proc/meminfo
```

---

## Problem 36: Basic Idea of Merge Sort

Merge Sort employs the divide-and-conquer strategy. The algorithm repeatedly divides the array of `n` elements into two halves until each part contains only one element (n/2, n/4, ..., 1). Then, it merges these smaller sorted arrays back together by comparing and rearranging elements. The merging process continues until a single sorted array is obtained. Additional space of size `n` is required for merging.

---

## Problem 37: Principles of Gradient Descent

Gradient Descent is an optimization algorithm that iteratively updates the parameters `θ` of a model to minimize a cost function. The key principles include:
- **Learning Rate:** A predefined factor that determines the step size during parameter updates.
- **Partial Derivatives:** Computing the partial derivatives of the cost function with respect to each parameter `θ`.
- **Iterative Updates:** Adjusting the parameters in the opposite direction of the gradient, iteratively moving towards the minimum of the cost function.

---

## Problem 38: Issues with Small k-values in k-Nearest Neighbors (k-NN)

When k is too small in k-NN, it can lead to several problems:
- **Overfitting:** Sensitivity to noise in the data, making the model less generalizable.
- **Increased Impact of Outliers:** Greater susceptibility to the influence of outliers.
- **Loss of Generalization:** Reduced ability to generalize well to unseen data.

---

## Problem 39: Naive Assumption in Naive Bayes

The "naive" aspect of Naive Bayes lies in its assumption that all features in the dataset are equally important and independent, which is often unrealistic in real-world scenarios. Despite its simplicity, this assumption is referred to as "naive."

---

## Problem 40: Overview of Decision Tree Model

**Advantages:**
- **Readability:** Easy to understand and interpret.
- **Speed:** Quick classification.
  
**Disadvantages:**
- **Overfitting:** Prone to overfitting, especially on small datasets or deep trees.
- **Binary Decision:** Strictly binary decisions may not capture complex relationships in data effectively.

---

## Problem 41: Derivation of LSTM Structure and Advantages over RNN

### LSTM Structure Derivation:

LSTM (Long Short-Term Memory) includes several components:
- **Forget Gate:** Controls what information from the cell state should be thrown away.
- **Input Gate:** Modifies the cell state by selectively updating it.
- **Cell State:** Stores long-term information.
- **Output Gate:** Decides what the next hidden state should be.

LSTM equations:
- Forget Gate: \( f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f) \)
- Input Gate: \( i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i) \)
- Cell State: \( \tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C) \)
- New Cell State: \( C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t \)
- Output Gate: \( o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o) \)
- Hidden State: \( h_t = o_t \cdot \tanh(C_t) \)

### Advantages over RNN:

LSTM's advantages over traditional RNNs:
- **Long-Term Dependencies:** LSTMs can capture and remember long-term dependencies more effectively.
- **Gradient Stability:** LSTMs address the vanishing/exploding gradient problem better than RNNs.
- **Selective Information Flow:** The forget gate allows LSTMs to selectively remember or forget information.

---

## Problem 42: Understanding Regularization

Regularization is introduced to prevent overfitting. It adds a regularization term (typically the norm of the model parameter vector) to the empirical risk, allowing a balance between fitting the data and keeping the model simple. The regularization rate controls the weight given to the model complexity against the empirical risk. Occam's Razor principle states that the best model is the simplest one that adequately explains the known data.

---

## Problem 43: Differences Between Linear and Nonlinear Classifiers

### Linear Classifier:
- **Structure:** Parameterized linear function.
- **Examples:** Linear Regression, Logistic Regression, SVM (linear kernel).
- **Advantages:** Simplicity, speed.
- **Disadvantages:** Limited expressive power, may not fit complex patterns well.

### Nonlinear Classifier:
- **Structure:** Can capture nonlinear relationships.
- **Examples:** Decision Trees, Random Forests, Gradient Boosting, Neural Networks.
- **Advantages:** Increased expressive power, better fit for complex data.
- **Disadvantages:** Complexity, potential overfitting.

---

## Problem 44: Differences Between Batch Normalization (BN) and Layer Normalization (LN)

### BN vs. LN:

- **Batch Normalization (BN):**
  - Normalizes over the batch dimension.
  - Different mean and variance per feature over the batch.
  - Depends on batch size.

- **Layer Normalization (LN):**
  - Normalizes over the feature dimension.
  - Same mean and variance per feature over the batch.
  - Independent of batch size.
  - Suitable for batch size = 1 and recurrent networks.

---

## Problem 45: Introduction to Self Attention

Self Attention differs from traditional Attention by focusing on dependencies within the source or target input itself. It captures dependencies between words within the source or target without relying on external context.

---

## Problem 46: Pre-training Process of BERT

BERT's pre-training involves two tasks: Masked Language Model (MLM) and Next Sentence Prediction (NSP).
- **Masked Language Model (MLM):**
  - Randomly masks 15% of tokens in a sentence.
  - Predicts the masked tokens based on the context.

- **Next Sentence Prediction (NSP):**
  - Selects sentence pairs A and B, with 50% being consecutive sentences and 50% random.
  - Predicts whether B is the next sentence after A.

Both tasks are combined during pre-training, and the losses are summed.

---

## Problem 47: Differences Between Pre-Norm and Post-Norm

In the context of normalization in deep learning architectures:

- **Pre-Norm (Norm and Add):**
  - Structure: Applies normalization before addition in a residual block.
  - Effect: Can unintentionally increase model width and reduce depth.

- **Post-Norm (Add and Norm):**
  - Structure: Applies normalization after addition in a residual block.
  - Effect: Retains better depth but may weaken the identity branch.

---

## Problem 48: Differences Between GPT and BERT

1. **Model Directionality:**
   - **GPT (Generative Pre-trained Transformer):**
     - Single-directional model, utilizes only the preceding context.
   - **BERT (Bidirectional Encoder Representations from Transformers):**
     - Bidirectional model, captures information from both preceding and following contexts.

2. **Model Architecture:**
   - **GPT:**
     - Based on an autoregressive model suitable for NLU (Natural Language Understanding) and NLG (Natural Language Generation) tasks.
   - **BERT:**
     - Based on an autoencoding model, primarily designed for NLU tasks.

---

## Problem 49: Characteristics of Recursion

Recursion in programming has the following characteristics:
- **Stack Frame Formation:**
  - Function calls create a stack frame, containing local variables specific to that function.
- **Space Allocation:**
  - Temporary (local) variables are allocated within the function's stack frame.
- **Automatic Frame Release:**
  - Upon function return, the function's stack frame is automatically released.
- **Finite Recursion:**
  - Legal recursion involves a finite number of calls to prevent stack overflow.

---

## Problem 50: Methods to Resolve Hash Collisions

### 1. Open Addressing (Closed Hashing)
   - **Linear Probing:**
     - Use the formula \( Hi = (H(key) + di) \mod m \), where di is an increment sequence.
   - **Quadratic Probing:**
     - Use di values like 1, -1, 2, -2, 4, -4, ... until a non-colliding position is found.
   - **Random Probing:**
     - Use a pseudo-random increment sequence.

### 2. Rehashing
   - Calculate addresses using multiple hash functions until an empty slot is found.
   - Addresses are obtained using \( Hi = RH_i(key) \), where i = 1, 2, ..., k.

### 3. Chaining (Separate Chaining)
   - Create a linked list for each hash value storing all synonyms.
   - Suitable for frequent insertions and deletions.
  
### 4. Establish a Common Overflow Area
   - Use an additional vector (OverTable) to store collided records.
   - Addresses are determined by the main hash function, and collisions go to the overflow area.

---

## Problem 51: Dimensionality Reduction Methods

### Methods for Dimensionality Reduction:

1. **Missing Value Ratio:**
   - Identify and filter features based on the percentage of missing values.

2. **Low Variance Filter:**
   - Remove features with low variance.

3. **High Correlation Filter:**
   - Filter features that are highly correlated.

4. **Random Forest:**
   - Utilize feature importance from a Random Forest model.

5. **Backward Feature Elimination:**
   - Iteratively remove the least significant features.

6. **Forward Feature Selection:**
   - Iteratively add the most significant features.

7. **Factor Analysis:**
   - Model observed data as linear combinations of underlying factors.

8. **Principal Component Analysis (PCA):**
   - Transform data to a new coordinate system representing principal components.

9. **Independent Component Analysis (ICA):**
   - Decompose data into statistically independent components.

10. **Locally Linear Embedding (LLE):**
    - Non-linear dimensionality reduction technique.

11. **ISOMAP:**
    - Isometric Mapping, a non-linear dimensionality reduction method.

12. **t-SNE:**
    - t-Distributed Stochastic Neighbor Embedding for visualizing high-dimensional data.

13. **UMAP:**
    - Uniform Manifold Approximation and Projection, a dimension reduction technique.

14. **Autoencoder:**
    - Neural network-based approach for learning efficient data representations.

15. **Laplacian Eigenmap:**
    - Spectral technique for nonlinear dimensionality reduction.

---

## Problem 52: Differences Between XGBoost (xgb) and Gradient Boosting Decision Trees (GBDT)

1. **Performance Differences:**
   - **XGBoost:**
     - Generally achieves higher accuracy.
   - **GBDT:**
     - May have lower accuracy compared to XGBoost.

2. **Efficiency Differences:**
   - **XGBoost:**
     - More efficient due to the use of second-order derivatives.
   - **GBDT:**
     - Less efficient compared to XGBoost.

3. **Handling Missing Values:**
   - **XGBoost:**
     - Ignores missing values during training.
   - **GBDT:**
     - Estimates missing values using other values in the dataset.

4. **Parallelization:**
   - **XGBoost:**
     - Supports feature-level parallelism.
   - **GBDT:**
     - Lacks efficient parallelization, making it slower.

---

## Problem 53: Differences Between Virtual Functions and Pure Virtual Functions

1. **Usage:**
   - **Virtual Function:**
     - Can be directly used in the base class.
   - **Pure Virtual Function:**
     - Must be implemented in the derived class before use.

2. **Definition:**
   - **Virtual Function:**
     - Defined with the `virtual` keyword.
   - **Pure Virtual Function:**
     - Defined with `virtual` and `=0`.

3. **Implementation:**
   - **Virtual Function:**
     - Must be implemented in the base class.
   - **Pure Virtual Function:**
     - Must be implemented in the derived class.

4. **Override:**
   - Both virtual and pure virtual functions can be overridden in derived classes.

5. **Destructor:**
   - It's recommended to define destructors as virtual functions, especially in classes with inheritance.

---

## Problem 54: Least Squares Method

The Least Squares Method is a mathematical optimization technique used to find the best-fitting curve that minimizes the sum of the squared differences between observed and predicted values.

- **Objective:**
  - Minimize the sum of squared errors between predicted and actual values.
  
- **Applications:**
  - Used for curve fitting, regression analysis, and solving optimization problems.

---

## Problem 55: Advantages of the Adam Optimization Algorithm

Adam optimization algorithm offers several advantages in non-convex optimization problems:

1. **Direct Implementation:**
   - Straightforward to implement.

2. **Efficiency in Computation:**
   - Efficient computations, particularly when compared to other optimization algorithms.

3. **Low Memory Requirement:**
   - Requires less memory compared to some alternatives.

4. **Invariance to Gradient Diagonal Scaling:**
   - Shows invariance to gradient diagonal scaling.

5. **Parallelization:**
   - Supports parallelization at the feature level, reducing computational load.

6. **Suitability for Large-scale Problems:**
   - Effective for optimization problems with large datasets and parameters.

7. **Applicability to Non-Stationary Objectives:**
   - Suitable for objectives that are not stationary.

8. **Handling Noisy or Sparse Gradients:**
   - Effective in scenarios with high noise or sparse gradients.

9. **Interpretable Hyperparameters:**
   - Hyperparameters are interpretable and typically require minimal tuning.

---
## Problem 56: Comparison Between GMM (Gaussian Mixture Model) and KMeans Algorithms

### Differences between GMM and KMeans:

1. **Handling Data Shapes:**
   - **KMeans:**
     - Suitable for circular or spherical data clusters.
   - **GMM:**
     - Effective for elliptical data clusters.

2. **Handling Imbalanced Classes:**
   - **KMeans:**
     - May perform poorly with imbalanced class distributions.
   - **GMM:**
     - Considers class weights during computation, addressing imbalanced datasets.

3. **Model Nature:**
   - **KMeans:**
     - Discriminative model, directly dividing the sample space.
   - **GMM:**
     - Generative model, calculates joint probability distribution, enhancing interpretability.

4. **Classification Type:**
   - **KMeans:**
     - Hard classification, assigning data points to a single cluster (0 or 1).
   - **GMM:**
     - Soft classification, providing a probability distribution for each cluster.

---

## Problem 57: Understanding Neural Networks

### Principles of Neural Networks:

Neural networks, or artificial neural networks, are complex systems formed by interconnecting basic processing units called neurons. During the learning process, known training sample data is repeatedly added to the network's input. The learning mechanism adjusts the weights of each neuron to achieve predefined output.

**Key Concepts:**
- **Definition:**
  - Neural networks simulate the behavior of animal neural networks for distributed parallel information processing.
- **Constituents:**
  - Composed of numerous simple basic elements—neurons—interconnected with each other.
- **Operation:**
  - Mimics the neural processing of information in a biological system.
- **Functionality:**
  - Processes information in parallel and facilitates non-linear transformations.
- **Essence:**
  - Essentially simulates the decision-making process of the human brain using computer languages.

**Biological Neuron Structure:**

- Neuron structure model with xj as the input signal, θi as the threshold, wij as the weight connected to the neuron, and yi as the output value judging whether xjwij is greater than the threshold θi.

**Threshold:**
- Critical value. Neural networks imitate the neurons in the brain. When external stimuli reach a certain threshold, neurons are stimulated, affecting the next neuron.

**Representative Network Models:**
- Single-layer Feedforward Neural Network—Linear Network
- Stepwise Network
- Multi-layer Feedforward Neural Network (Backpropagation learning rule, i.e., BP Neural Network)
- Elman Network, Hopfield Network, Bidirectional Associative Memory Network, Self-organizing Competitive Network, and more.

**Applications of Neural Networks:**
- Approximation of functions, data clustering, pattern classification, optimization calculations, etc.
- Applied in artificial intelligence, automatic control, robotics, statistics, and other fields for information processing.

While neural networks have broad applications, choosing the right network structure during usage requires a comprehensive understanding of various neural network structures.

---


## Problem 58: How is PCA implemented?
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

### Define a mean function.
```python
# Calculate mean, requiring input data in numpy matrix format, where rows represent samples and columns represent features
def meanX(dataX):
    return np.mean(dataX,axis=0) # axis=0 means calculating the mean along columns. If the input is a list, then axis=1
```

### Start implementing the PCA function:
```python
def pca(XMat, k):
    """
    XMat: Input as a numpy matrix, where rows represent samples and columns represent features
    k: Represents the number of top k eigenvalues and corresponding eigenvectors to be selected
    finalData: Refers to the returned low-dimensional matrix
    reconData: Corresponds to the matrix after moving the coordinate axis
    """
    average = meanX(XMat)
    m, n = np.shape(XMat)
    data_adjust = []
    avgs = np.tile(average, (m, 1))
    data_adjust = XMat - avgs
    covX = np.cov(data_adjust.T)  # Calculate the covariance matrix
    featValue, featVec = np.linalg.eig(covX)  # Solve for the eigenvalues and eigenvectors of the covariance matrix
    index = np.argsort(-featValue)  # Sort in descending order according to featValue
    finalData = []
    if k > n:
        print("k must be lower than the feature number")
        return
    else:
        # Note that the eigenvector is a column vector. In a two-dimensional matrix (array) a[m][n], a[1] represents the values in the 1st row
        selectVec = np.matrix(featVec.T[index[:k]])  # So here, it needs to be transposed
        finalData = data_adjust * selectVec.T
        reconData = (finalData * selectVec) + average
    return finalData, reconData
```

---

## Problem 59:What command is used to remotely copy files?

1. To set up sharing for a specific directory on a remote machine.

2. Using the command line:
```
  @echo off
  net use \\192.168.1.2\ipc$ password /user:Administrator
  rem Copy a single file (can execute other commands like del)
  copy D:\setup.bat \\192.168.1.2\temp
  rem Copy a directory /s copy non-empty directories and subdirectories. If /s is omitted, xcopy works within one directory. /e copy all subdirectories, including empty ones. Use /e, /s, and /t command-line options simultaneously.
  rem XCOPY D:\TEMP \\192.168.1.2\temp/E
  net use \\192.168.1.2\ipc$ /delete
  pause
```
---

## Problem 60: What commands can be used to view files in Linux?

Commands for viewing log files in Linux include:

cat: Displays file contents from the first line.
tac: Displays file contents starting from the last line; tac is cat spelled backward.
nl: Displays content with line numbers.
more: Displays file contents one page at a time.
less: Similar to more but allows backward paging.
head: Shows only the initial lines of the file.
tail: Displays only the final lines of the file.

You can use "man [command]" to view the usage documentation for each command, for example: "man cp".

---

## Problem 61: What is the objective function of GBDT?

GBDT specifically refers to the Gradient Boosting Decision Tree algorithm, which optimizes in the function space using gradient descent.

GBDT is the process of combining multiple weak classifiers to create a strong classifier (weighted sum). In each iteration, a weak classifier is generated, trained on the basis of the residuals of the previous classifiers. The key to GBDT is that each tree learns the accumulated residuals of all previous trees, making these residuals the accumulated quantity for obtaining true values when adding predictions.

Gradient refers to an N-dimensional vector composed of the descending directions of scores for each document, where N is the number of samples. Here, the logic of "residual calculation" is replaced by "gradient calculation." Think of the gradient direction as the optimal direction for each step, and with many cumulative steps, you can eventually reach a local optimum. If this point happens to be the global optimum, the effect is similar to using residuals.

Objective: Minimize the loss function as quickly as possible, allowing the loss function to decrease along the gradient direction. This is the core of GBDT.

---

## Problem 62: What are the ways to bind events in React?

1. Using bind in the render method.
2. Using arrow functions in the render method.
3. Binding in the constructor.
4. Using arrow functions during the definition phase.

---

## Problem 63: In which aspects can Convolutional Neural Networks be used?

1. Pattern classification.
2. Object detection.
3. Object recognition.
4. Image recognition.

---

## Problem 64: Please list the isolation levels of transactions from low to high.

1. Read Uncommitted
2. Read Committed
3. Repeatable Read
4. Serializable

---

## Problem 65: What principles should be considered when adding indexes?

1. Avoid creating indexes on columns rarely used or referenced in queries.
2. Avoid adding indexes to columns with very few distinct data values.
3. Avoid indexing columns defined as text, image, or bit data types.
4. Do not create indexes when modification performance significantly exceeds retrieval performance.
5. Always create indexes on columns with foreign keys.

---
## Problem 66: Characteristics of B+ Tree

B+ Tree has similarities with B-Tree in structure, but it also possesses its own features. What are they?

1. All non-leaf nodes store only key information.
2. All specific data is stored in leaf nodes.
3. All leaf nodes contain information about all elements.
4. There is a chain pointer between all leaf nodes.

---

## Problem 67: Understanding Vehicle Planning Algorithms

Considering the research history of vehicle navigation systems, vehicle path planning algorithms can be divided into static path planning algorithms and dynamic path algorithms. Static path planning seeks the shortest path based on constraints such as physical geography information and traffic rules. While static path planning algorithms have matured and are relatively simple, their application significance is limited in actual traffic conditions.

Dynamic path planning, building upon static path planning, adjusts the pre-planned optimal driving route in real-time based on real-time traffic information. Below are introductions to several common vehicle path planning algorithms:

### Dijkstra's Algorithm
Dijkstra's algorithm is a classic among shortest path algorithms, proposed by E.W. Dijkstra in 1959. It is suitable for computing the shortest path in problems where road weights are non-negative, providing the shortest paths from one node to all other nodes in the graph. Although clear in concept and accurate in searching, it suffers from drawbacks such as long processing times and large space consumption due to the input being a large sparse matrix. Its algorithmic complexity is O(n²), where n is the number of nodes.

### Lee's Algorithm
Initially used for path tracing in printed circuits and integrated circuits, Lee's algorithm is more suitable for dynamic road path planning where data changes continuously compared to Dijkstra's algorithm. Its operational cost is lower than Dijkstra's algorithm. If the optimal path exists, Lee's algorithm can find it. The complexity of Lee's algorithm is challenging to express, and for path planning on multiple layers, it requires substantial space.

### Floyd's Algorithm
Proposed by Floyd in 1962, this algorithm computes the shortest distance between any two points in a graph. It handles directed graphs or negative-weighted shortest path problems and is also used for calculating the transitive closure of directed graphs. The time complexity of the Floyd-Warshall algorithm is O(n³), and space complexity is O(n²), where n is the number of nodes. While the time complexity is the same as running Dijkstra's algorithm for each node, its actual computational performance is better.

### A* Algorithm (A-Star)
A* algorithm, proposed by Hart, Nilsson, and Raphael, is a heuristic search algorithm. It accelerates search speed by introducing a heuristic function, enhancing the accuracy of local optimum search. A* algorithm requires less storage space than Dijkstra's algorithm. Its time complexity is O(bd), where b is the average out-degree of nodes, and d is the search depth from the start point to the end point.

### Bidirectional Search Algorithm
The bidirectional search algorithm, proposed by Dantzig and formally presented by Nicholson, searches for the shortest path from the starting point and the endpoint simultaneously. The best outcome is when both meet at the midpoint, shortening the search time. However, if the termination rules are inappropriate, this algorithm may double the search time.

### Ant Colony Algorithm
The ant colony algorithm, proposed by Italian scholar M. Dorigo in 1991, is a random search algorithm based on the study of collective behavior in ant colonies. It is robust and easy to combine with other methods. The ant colony algorithm's complexity is superior to Dijkstra's algorithm.

Moreover, there are real-time heuristic search algorithms, layered road network-based search algorithms, neural networks, genetic algorithms, fuzzy theory, etc. Different practical requirements lead to varied algorithm demands and emphases. Therefore, numerous improved algorithms combining multiple methods have been developed to address the shortcomings in solving vehicle path planning problems.

---

## Problem 68: Difference Between struct and class

In C++, the `struct` and `class` keywords are generally interchangeable. However, they have differences:

- `struct` is more suitable to be seen as an implementation of a data structure, while `class` is more suitable as an implementation of an object. `struct` lacks inheritance, encapsulation (only preliminary encapsulation), while `class` allows three types of encapsulation: private, public, and protected. It also supports inheritance and derivation.

- `class` is a reference type, while `struct` is a value type.

- `class` has a default parameterless constructor and a destructor, whereas `struct` does not have a default parameterless constructor and can only declare a parameterized constructor. `class` supports `abstract` and `sealed` with a `protected` modifier.

- `struct` does not support `abstract` and `sealed` and lacks a `protected` modifier.

- Both can provide their own interface functions and constructors. A class can be inherited from a structure. A `struct` can be seen as a collection of data accessible from the outside, while a `class` achieves encapsulation, maintaining data security, adhering to object-oriented principles.

- Class instances are managed by the garbage collection mechanism, while struct variables are immediately automatically deallocated after use. From a functional perspective, a class represents behavior, while a struct is commonly used for data storage.

---

## Problem 69: How is AUC Calculated?

The most intuitive way to calculate AUC (Area Under the Curve) is to compute the area under the ROC (Receiver Operating Characteristic) curve. In essence, it's the sum of the areas under the step-like curve. As our test samples are finite, the AUC curve will inevitably be step-like. Therefore, calculating AUC is essentially finding the sum of these step areas.

Firstly, we sort the scores (assuming larger scores correspond to a higher probability of belonging to the positive class). We then scan through the scores, and as we encounter each positive sample, we accumulate the area under the curve. However, when multiple test samples have equal scores, adjusting the threshold results not in a step extending vertically or horizontally, but in a trapezoid forming diagonally.

To address this, we need to calculate the area of this trapezoid. Thus, calculating AUC using this method can be somewhat intricate. An interesting property of AUC is its equivalence to the Wilcoxon-Mann-Witney Test. This test determines the probability that the score of a positive sample is greater than that of a negative sample. To compute AUC using this method, we need to calculate this probability.

Practically, this probability is estimated through frequencies. By counting how many pairs of positive and negative samples have positive scores, we get the number of pairs where the positive sample's score exceeds the negative sample's score. Dividing this by M×N (M is the number of positive samples, N is the number of negative samples) gives us the AUC. This method has a time complexity of O(n^2), where n is the number of samples (n = M + N).

The third method is essentially the same as the second one but with reduced complexity. First, we sort the scores from largest to smallest, assigning the rank of n to the sample with the highest score, n-1 to the second-highest score, and so on. Then, we sum the ranks of all positive samples, subtracting M-1 for the combinations of two positive samples. Finally, we divide by M×N.

In summary:
1. For calculating combinations where the score of a positive sample exceeds that of a negative sample, we consider the ranks of the samples. However, we need to subtract M-1 for each combination of two positive samples. This gives us the expression M×(M+1)/2, which represents the number of positive combinations.
2. As explained above, if all positive samples have scores greater than those of negative samples, the AUC value is 1.

This method includes (positive, positive) combinations, so we need to subtract the cases where a positive sample follows another positive sample, giving us the final formula.

Additionally, when scores are equal, it's crucial to assign the same rank to all samples with equal scores (regardless of being in the same or different classes). The operation involves taking the average rank of all samples with equal scores and then applying the formula mentioned above.

---

## Problem 70: Understanding Multiprocessing and Multithreading
### (1) Processes:
A process encompasses code, data, and resources (memory). In a computer system, a process is essentially identified by a PID (Process ID). The operating system protects the process space from external interference, ensuring that one process cannot access the memory of another process. Sometimes, processes need to communicate, and this can be achieved using the operating system's inter-process communication mechanisms.

In typical scenarios, when executing an executable file, the operating system creates a process to run it. However, if the executable file is designed based on multiprocessing, the operating system will create multiple processes from the initial one. These processes execute the same code, but the results may vary.

Why do we need multiple processes? The most straightforward idea is that if the operating system supports multiple cores, an executable file can run on different cores. Even in a non-multi-core environment, one process can run on the CPU while another process is waiting for I/O operations, improving CPU utilization and program efficiency.

In Linux, you can create processes in the parent process using fork(). After a process calls fork(), the system first allocates resources for the new process, such as storage for data and code space. Then, it copies all values and states of the original process to the new process, with only a few values differing to distinguish between the processes. The fork() function returns twice: once for the parent process (returns the child process's PID or fork failure information) and once for the child process (returns 0).

At this point, the two processes part ways and run independently in the system.
```c++
#include <unistd.h>  
#include <sys/types.h> 
#include <sys/wait.h>     
#include <stdio.h>  
#include <stdlib.h>
 
void print_exit(){
    printf("the exit pid:%d\n",getpid() );     
}  
  
int main (){
    pid_t pid;   
    atexit( print_exit );      //注册该进程退出时的回调函数  
    pid=fork();   // new process
 
    int count = 0;
 
    if (pid < 0){
        printf("error in fork!");
    }   
    else if (pid == 0){
        printf("i am the child process, my process id is %d\n",getpid());
        count ++;
        printf("child process add count.\n");
    }
    else {  
        printf("i am the parent process, my process id is %d\n",getpid());
 
        count++; 
        printf("parent process add count.\n");  
        sleep(2);  
        wait(NULL);  
    }  
 
    printf("At last, count equals to %d\n", count);
   return 0;
} 

```
The code snippet below performs a check after the fork() to determine whether the current process is the parent or child. To illustrate that parent and child processes have their own resource space, a count variable is used. The terminal output confirms that both processes execute the count++ operation. However, since the count is in different processes, the count is effectively executed only once in each respective process.

Parent process - Count: 1
Child process - Count: 1


### (2) Threads:
A thread is an executable code unit, and the CPU can execute single units independently. In a thread-based multitasking environment, all processes have at least one thread (main thread), but they can have multiple tasks. This means a single program can concurrently execute two or more tasks.

Threads can divide a process into many pieces, each acting as an independent flow. The CPU can choose which flow to execute. However, threads are not processes; they do not have a PID, and the allocated resources belong to their process. Threads share global variables of the process and can have their private space.

This is distinct from multiprocessing, where a process is a copied flow. Threads only divide a river into many streams. It avoids copying this extra overhead, and with multithreading technology, a single existing river is almost effortlessly transformed into many small streams. Its greatness lies in its minimal system overhead.

In Linux, the pthread library is used to create threads. Due to pthread not being the default library in the Linux kernel, it needs to be included during compilation.

g++ -o main main.cpp -pthread

```c++
  #include <stdio.h>  
  #include <string.h>  
  #include <stdlib.h>  
  #include <unistd.h>  
  #include <pthread.h>  
    
  void* task1(void*);  
  void* task2(void*);  
  
  void usr();  
  int p1,p2;  
  
  int count = 0 ;
  
  int main()  {  
      usr();  
      return 0;  
  }  
    
  void usr(){  
      pthread_t pid1, pid2;  
      pthread_attr_t attr;  
      void *p1, *p2;  
      int ret1=0, ret2=0;  
      pthread_attr_init(&attr);                               
      pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);   
      pthread_create(&pid1, &attr, task1, NULL);             
      pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);  
      pthread_create(&pid2, &attr, task2, NULL);            
    
      ret1=pthread_join(pid1, &p1);       
      ret2=pthread_join(pid2, &p2);         
      printf("after pthread1:ret1=%d,p1=%d\n", ret1,(int)p1);    
      printf("after pthread2:ret2=%d,p2=%d\n", ret2,(int)p2); 
  
      printf("At last, count equals to %d\n", count);             
  }  
    
  void* task1(void *arg1){  
      printf("task1 begin.\n");   
      count++;
      printf("task1 thread add count.\n");
      pthread_exit( (void *)1);   
  }  
    
  void* task2(void *arg2){  
      printf("thread2 begin.\n");  
      count ++;
      printf("task2 thread add count.\n");
      pthread_exit((void *)2);  
  } 
  

```

In the code snippet below, the main thread in the usr() function creates two threads. The threads have JOINABLE attributes, meaning they can be collected for return information by other threads. The main thread waits for the return of the two threads and then outputs the return information. The terminal output indicates that thread2 executes before thread1, demonstrating that this is not a synchronized program. Thread execution is independent, managed by kernel thread scheduling. To distinguish threads, the code includes the count++ operation. Finally, the main thread outputs count=2, indicating that count has been counted twice. Child threads are allowed to use the same shared variable within the process, distinguishing the concept of processes.

Thread 2 - Count: 2
Thread 1 - Count: 1
Main thread - Count: 2


Due to the uncertainty of thread sequence and time, it often requires restrictions on reading and writing a shared variable within a process, such as using locks.




